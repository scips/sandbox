#!/usr/bin/python

from Crypto.Cipher import AES
from Crypto.Util import Counter
from Crypto.Hash import SHA
from Crypto import Random
import sys

Questions = [
    {'key':'140b41b22a29beb4061bda66b6747e14','ct':'4ca00ff4c898d61e1edbf1800618fb2828a226d160dad07883d04e008a7897ee2e4b7465d5290d0c0e6c6822236e1daafb94ffe0c5da05d9476be028ad7c1d81'}
    ,{'key':'140b41b22a29beb4061bda66b6747e14','ct':'5b68629feb8606f9a6667670b75b38a5b4832d0f26e1ab7da33249de7d4afc48e713ac646ace36e872ad5fb8a512428a6e21364b0c374df45503473c5242a253'}
    ,{'key':'36f18357be4dbd77f050515c73fcf9f2','ct':'69dda8455c7dd4254bf353b773304eec0ec7702330098ce7f7520d1cbbb20fc388d1b0adb5054dbd7370849dbf0b88d393f252e764f1f5f7ad97ef79d59ce29f5f51eeca32eabedd9afa9329'}
    ,{'key':'36f18357be4dbd77f050515c73fcf9f2','ct':'770b80259ec33beb2561358a9f2dc617e46218c0a53cbeca695ae45faa8952aa0e311bde9d4e01726d3184c34451'}
]

def cbcdec(question):
    iv = question['ct'][0:32]
    ct = question['ct'][32:]
    byteKey = question['key'].decode('hex')
    byteIv = iv.decode('hex')
    byteCt = ct.decode('hex')

    cipher1 = AES.new(byteKey,AES.MODE_CBC,byteIv)
    msg1 = cipher1.decrypt(byteCt)
    return msg1

def ctrdec(question):
    iv = question['ct'][0:32]
    ct = question['ct'][32:]

    byteKey = question['key'].decode('hex')
    byteCt = ct.decode('hex')

    ctr = Counter.new(128,initial_value=long(iv, 16))
    cipher2 = AES.new(byteKey,AES.MODE_CTR,counter=ctr)
    msg2 = cipher2.decrypt(byteCt)
    return msg2

def cbcenc(text):
    iv = Random.new().read(AES.block_size)
    key = Random.new().read(16)
    print key.encode('hex')

    cipher = AES.new(key,AES.MODE_CBC,iv)
    # pad text
    topad = 16 - len(text)%16
    for i in range(0,topad):
        text += chr(topad)

    message = iv + cipher.encrypt(text)
    return {'key':key.encode('hex'),'ct':message.encode('hex')}

def ctrenc(text):
    iv = Random.new().read(AES.block_size)
    key = Random.new().read(16)
    print key.encode('hex')

    ctr = Counter.new(128,initial_value=long(iv.encode('hex'), 16))
    cipher = AES.new(key,AES.MODE_CTR,counter=ctr)
    message = iv + cipher.encrypt(text)
    return {'key':key.encode('hex'),'ct':message.encode('hex')}

def decryptMessages(Questions):
    for i in range(0,len(Questions)):
        question = Questions[i]
        print "Question #:",i+1
        try:
            print "CBC dec",cbcdec(question)
        except Exception, e:
            print(e)
        try:
            print "CTR dec",ctrdec(question)
        except Exception, e:
            print(e)
    
def encryptText(text):
    print "Text: ",text
    cbcEncrypted = cbcenc(text)
    ctrEncrypted = ctrenc(text)
    print "cbcEncrypted:",cbcEncrypted
    print "ctrEncrypted:",ctrEncrypted
    print "decrypted:",cbcdec(cbcEncrypted)
    print "decrypted:",ctrdec(ctrEncrypted)


encryptText(sys.argv[1])