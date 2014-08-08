#!/usr/bin/python

from Crypto.Cipher import AES
from Crypto import Random

def cbcenc(text):
    iv = Random.new().read(AES.block_size)
    key = Random.new().read(16)
    print key.encode('hex')

    cipher = AES.new(key,AES.MODE_CBC,iv)
    # pad text
    topad = 16 - len(text)%16
    for i in range(0,topad):
        text += chr(topad)

    ct = iv + cipher.encrypt(text)
    return {'key':key.encode('hex'),'ct':ct.encode('hex')}

def cbcdec(question):
    iv = question['ct'][0:32]
    ct = question['ct'][32:]
    byteKey = question['key'].decode('hex')
    byteIv = iv.decode('hex')
    byteCt = ct.decode('hex')

    cipher1 = AES.new(byteKey,AES.MODE_CBC,byteIv)
    msg1 = cipher1.decrypt(byteCt)
    return msg1

def strxor(a, b):     # xor two strings of different lengths
    print "xoring ",a,b
    if len(a) > len(b):
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

message = "test 1000"
newdigits = "2345"
res = cbcenc(message)
print res['key'], res['ct']
iv = res['ct'][0:32]
ct = res['ct'][32:]

toxoriv = ''.zfill(len('test ')*2)+'1000'.encode('hex')+''.zfill( (len(iv)-len(message)*2) )
toxornewmsgiv = ''.zfill(len('test ')*2)+newdigits.encode('hex')+''.zfill( (len(iv)-len(message)*2))
print "iv            ",iv
print "toxoriv       ",toxoriv
print "toxornewmsgiv ", toxornewmsgiv
xoredivs = strxor(toxoriv.decode('hex'), toxornewmsgiv.decode('hex'))
xoredivsandiv = strxor(xoredivs, iv.decode('hex'))
print iv+ct,"iv,ct"
print xoredivs.encode('hex'), "xoredivs"
print xoredivsandiv.encode('hex'), "xoredivsandiv"

ivandct = (iv+ct)
print ivandct,"ivandct"
decoded = cbcdec({'key':res['key'],'ct':ivandct})
print "decoded ",decoded

ivandct = (xoredivsandiv.encode('hex')+ct)
print ivandct,"xoredivandct "
decodedxorediv = cbcdec({'key':res['key'],'ct':ivandct})
print "decoded xored iv", decodedxorediv

ivandct = '20814804c1767293b99f1d9cab3bc3e7ac1e37bfb15599e5f40eef805488281d'
iv = ivandct[0:32]
ct = ivandct[32:]
message = "Pay Bob 100$"
newdigits = "500"

toxoriv = ''.zfill(len('Pay bob ')*2)+'100'.encode('hex')+''.zfill( len(iv)-len(message)*2+2 )
toxornewmsgiv = ''.zfill(len('Pay bob ')*2)+'500'.encode('hex')+''.zfill( len(iv)-len(message)*2+2 )
print ivandct, "ivandct"
print "iv            ",iv
print "toxoriv       ",toxoriv
print "toxornewmsgiv ", toxornewmsgiv
xoredivs = strxor(toxoriv.decode('hex'), toxornewmsgiv.decode('hex'))
xoredivsandiv = strxor(xoredivs, iv.decode('hex'))
print iv+ct,"iv,ct"
print xoredivs.encode('hex'), "xoredivs"
print xoredivsandiv.encode('hex'), "xoredivsandiv"
ivandct = (xoredivsandiv.encode('hex')+ct)
print ivandct,"xoredivandct "
