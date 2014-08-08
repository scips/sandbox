#!/usr/bin/python

from Crypto.PublicKey import RSA

key = RSA.generate(2048)
f = open('test.pem','w')
f.write(key.exportKey('PEM'))
f.close()
