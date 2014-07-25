#!/usr/bin/python

import sys

def strxor(a, b):     # xor two strings of different lengths
    if len(a) > len(b):
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

def hex2bin(string):
    binstr = bin(int(string, 16))[2:].zfill(8)
    return binstr.zfill(len(string)*4)

def binXor(binStr1,binStr2):
    return bin(int(binStr1,2)^int(binStr2,2))[2:].zfill(max(len(binStr1),len(binStr2)))

def binAnd(binStr1,binStr2):
    return bin(int(binStr1,2)&int(binStr2,2))[2:].zfill(max(len(binStr1),len(binStr2)))    

def printStats1(binStr):
    cpt1 = 0
    for i in range(0,len(binStr)):
        if binStr[i] == '1':
            cpt1 += 1
    print binStr,' ',cpt1,'/',len(binStr),'=',(cpt1*1.0/len(binStr))

def printStatsSimil(binStr1,binStr2):
    cpt = 0
    for i in range(0,min(len(binStr1),len(binStr2))):
        if binStr1[i] == binStr2[i]:
            cpt += 1
    print binAnd(binStr1,binStr2),' ',cpt,'/',max(len(binStr1),len(binStr2)),'=',(cpt*1.0/max(len(binStr1),len(binStr2)))

def main():
    aL2 = sys.argv[1]
    bL2 = sys.argv[2]
    binaL2 = hex2bin(aL2)
    binbL2 = hex2bin(bL2)
    binbl2xor1 = binXor(binbL2,'11111111111111111111111111111111')
    # binbl2xor1andbinal2 = binAnd(binbl2xor1,binaL2)
    printStats1(binaL2)
    # print hex2bin(bL2)
    printStats1(binbl2xor1)
    printStatsSimil(binbl2xor1,binaL2)



main()