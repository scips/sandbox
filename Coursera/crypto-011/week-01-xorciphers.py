#!/usr/bin/python
import sys
import re

encryptedMessages = []

MSGS = [
"The quick brown fox jumps over the lazy dog"
,"dog The quick brown fox jumps over the lazy"
,"lazy dog The quick brown fox jumps over the"
,"the lazy dog The quick brown fox jumps over"
,"over the lazy dog The quick brown fox jumps"
,"jumps over the lazy dog The quick brown fox"
,"fox jumps over the lazy dog The quick brown"
,"brown fox jumps over the lazy dog The quick"
,"quick brown fox jumps over the lazy dog The"
]

theKey = ([],[]);

#  /   \
# |  n  |
# |     |
# |  2  |
#  \   /
def combineListByTuple(cipherlist):
    n = len(cipherlist)
    combinedList = []
    for i in range(n):
        for j in range(i+1,n):
            combinaison = (cipherlist[i],cipherlist[j])
            combinedList.append(combinaison)
    return combinedList

def strxor(a, b):     # xor two strings of different lengths
    if len(a) > len(b):
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

def xortuple(tupleof2):
    return strxor(tupleof2[0],tupleof2[1])

def xorCombinedListMessageText(combinedIndex,combinedList):
    xoredList = []
    index = 0
    for tupleof2 in combinedList:
        xoredstrings = xortuple(tupleof2)
        xoredList.append( ( (MSGS[combinedIndex[index][0]], MSGS[combinedIndex[index][1]]) ,xoredstrings) )
        index += 1
    return xoredList

def xorCombinedListCipherText(combinedIndex,combinedList):
    xoredList = []
    index = 0
    for tupleof2 in combinedList:
        xoredstrings = xortuple(tupleof2)
        xoredList.append( ( (encryptedMessages[combinedIndex[index][0]], encryptedMessages[combinedIndex[index][1]]) ,xoredstrings) )
        index += 1
    return xoredList


# m1 (+) m2 = c1 (+) c2
def compareTuples(item):
    m1 = item[0][0]
    m2 = item[0][1]
    c1xorc2 = item[1]
    m1xorm2 = strxor(m1,m2)
    print "m1\n--"
    print m1
    print "m2\n--"
    print m2
    return getReadablePartOfCipheredText(c1xorc2) 

def getReadablePartOfCipheredText(ct):
    readablePart = ""
    for c in ct:
        if isLetterByte(c):
            readablePart += c 
        else:
            readablePart += '#' 
    return readablePart

def isReadableByte(letter):
    regexp = re.compile('[a-zA-Z]')
    return True if regexp.match(letter) else False

def isLetterByte(letter):
    regexp = re.compile('[a-zA-Z]')
    return True if regexp.match(letter) else False

def isCapitalLetter(letter):
    regexp = re.compile('[A-Z]')
    return True if regexp.match(letter) else False

def isAcceptableReread(letter):
    regexp = re.compile('[a-zA-Z\ \,\.\-]')
    return True if regexp.match(letter) else False

def getTupleOfPotentialKeys(letterC1,letterC2,letterC1xorletterC2):
    m = letterC1xorletterC2.lower()
    # m xor c = k
    # case 1 m is part of m1
    potentialKey1 = strxor(m,letterC1)
    # case 2 m is part of m2
    potentialKey2 = strxor(m,letterC2)
    # return in first position the key that is probably the best
    if isReadableByte( strxor( letterC1, potentialKey1 ) ):
        return (potentialKey1, potentialKey2)
    else:
        return (potentialKey2, potentialKey1)

def getPotentialKey(ct1,ct2,readablePart):
    potentialKey = []
    for letterIndex in range(len(readablePart)):
        if readablePart[letterIndex] != '#':
            keys = getTupleOfPotentialKeys(ct1[letterIndex],ct2[letterIndex],readablePart[letterIndex])
            potentialKey.append(keys)
        else:
            potentialKey.append('#')
    return potentialKey

def printPotentialKeys(readableParts,xoredList):
    for i in range(len(readableParts)):
        potentialKey = getPotentialKey(readableParts[i])
        print xoredList[0]

def sumReadableParts(readableParts):
    readableSummary = ([],[])
    for readablePart in readableParts:
        stringIndex = 0
        for letter in readablePart:
            if len(readableSummary[0]) >= stringIndex+1:
                if readableSummary[0][stringIndex] != '#' and letter != '#':
                    # readable letter at this position already exists
                    if letter == readableSummary[0][stringIndex]:
                        # exists and is the same
                        readableSummary[1][stringIndex] += 1
                    else:
                        # exists but is different
                        print "Position: " + str(stringIndex) + " Existing letter: "+readableSummary[0][stringIndex]+" is different from current " + letter + " (ignoring)"
                else:
                    if letter != '#':
                        # first readable letter at this position
                        readableSummary[0][stringIndex] = letter 
                        readableSummary[1][stringIndex] = 1
            else:
                # first passage at this position append everything
                readableSummary[0].append(letter)
                if letter == '#':
                    readableSummary[1].append(0)
                else:
                    readableSummary[1].append(1)
            stringIndex += 1
    return readableSummary

def createPotentialKey(xoredEncryptedList):
    potentialKey = []
    for xoredEncryptedItem in xoredEncryptedList:
        c1 = xoredEncryptedItem[0][0]
        c2 = xoredEncryptedItem[0][1]
        c1xorc2 = xoredEncryptedItem[1]
        readablePart = getReadablePartOfCipheredText(c1xorc2)
        currentPotentialKey = getPotentialKey(c1, c2, readablePart)
        for i in range(len(currentPotentialKey)):
            if len(potentialKey) >= i+1:
                if currentPotentialKey[i] != '#' and potentialKey[i] == '#':
                    potentialKey[i] = currentPotentialKey[i]
            else:
                # add item to potential key
                potentialKey.append(currentPotentialKey[i])
    return potentialKey

def getKeyRatio(key):
    keylength = len(key)
    count = 0
    for char in key:
        if char != '#':
            count += 1
    return (count,keylength)

def decryptOneMessage(encryptedMessage, potentialKey):
    key = getKeyFromArray(potentialKey)
    message = ""
    for letterIndex in range(len(encryptedMessage)):
        if letterIndex<len(key):
            if key[letterIndex] == '#':
                message += '?'
            else:
                message += strxor(encryptedMessage[letterIndex], key[letterIndex])
        else:
            print "outof range key too small: "+str(letterIndex)+" < encryptedMessage: "+str(len(encryptedMessage))
    return message

def getKeyFromArray(potentialKey):
    key = ""
    for tupleItem in potentialKey:
        if tupleItem == '#':
            key += '#'
        else:
            key += tupleItem[0]
    return key

def decryptUsingPotentialKey(encryptedMessages, potentialKey):
    messages = []
    for i in range(len(encryptedMessages)):
        print "Message #"+str(i)+": "
        encryptedMessage = encryptedMessages[i]
        message = decryptOneMessage(encryptedMessage, potentialKey)
        print "Decrypted : "+message
        messages.append({"encrypted":encryptedMessage,"decrypted":message})
    return messages

def enhanceKey(decryptedMessage,encryptedMessage,potentialKey):
    print decryptedMessage
    humanReread = raw_input("retype the message\n")
    betterKey = potentialKey
    for i in range(len(humanReread)):
        if i < len(betterKey) and decryptedMessage[i] != humanReread[i]:
            if isAcceptableReread(humanReread[i]):
                exactKey = strxor(humanReread[i],encryptedMessage[i])
                if betterKey[i] == '#':
                    betterKey[i] = (exactKey,'#')
                else:
                    betterKey[i] = (exactKey,betterKey[i][0])
    return betterKey

def bruteForceLetter(index, encryptedMessages, tupleItem):
    potentialKeyValue=[]
    for encryptedMessage in encryptedMessages:
        if index < len(encryptedMessage):
            letterToDecrypt = encryptedMessage[index]
            for i in range(0,255):
                letterDecrypted = strxor(letterToDecrypt, chr(i))
                if isReadableByte(letterDecrypted):
                    potentialKeyValue.append(i)
    return potentialKeyValue

def reduceTupleOfKey(tupleOfKey):
    reducedAssoc = {}
    maxValue = 0
    for i in range(len(tupleOfKey)):
        strI = tupleOfKey[i]
        if strI in reducedAssoc:
            reducedAssoc[strI]+=1
            maxValue = reducedAssoc[strI]
        else:
            reducedAssoc[strI]=1
    toReturn = []
    for key in reducedAssoc:
        if reducedAssoc[key]>=maxValue:
            toReturn.append(chr(key))
    return tuple(toReturn)


def brutForceKey(encryptedMessages, potentialKey):
    for i in range(len(potentialKey)):
        tupleItem = potentialKey[i]
        if tupleItem == '#':
            tupleOfKey = bruteForceLetter(i,encryptedMessages,tupleItem)
            reducedSet = reduceTupleOfKey(tupleOfKey)
            potentialKey[i] = reduceTupleOfKey(tupleOfKey)
    return potentialKey

def humanForceKey(cts, potentialKey):
    for ct in cts:
        decrypted = decryptOneMessage(ct,potentialKey)
        potentialKey = enhanceKey(decrypted, ct, potentialKey)
    return potentialKey

def main():
    with file('ciphertextscoursera','r') as source:
        for ciphertext in source:
            encryptedMessages.append(ciphertext.rstrip().decode('hex'))
    combinedList = combineListByTuple(encryptedMessages)
    combinedIndex = combineListByTuple(range(len(encryptedMessages)))
    # xoredClearList = xorCombinedListMessageText(combinedIndex, combinedList)
    xoredEncryptedList = xorCombinedListCipherText(combinedIndex, combinedList)
    potentialKey = createPotentialKey(xoredEncryptedList)
    print getKeyRatio(potentialKey)
    decryptUsingPotentialKey(encryptedMessages, potentialKey)
    potentialKey = humanForceKey(encryptedMessages, potentialKey)
    humanForceKey(encryptedMessages, potentialKey)
    # potentialBrutForcedKey = brutForceKey(encryptedMessages, potentialKey)
    # decryptUsingPotentialKey(encryptedMessages, potentialBrutForcedKey)

main()