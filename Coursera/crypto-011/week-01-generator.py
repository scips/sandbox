#!/usr/bin/python
import sys

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

def strxor(a, b):     # xor two strings of different lengths
    if len(a) > len(b):
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

def random(size=16):
    return open("/dev/urandom").read(size)

def encrypt(key, msg):
    c = strxor(key, msg)
    print
    print c.encode('hex')
    return c

def encryptInHex(key, msg):
    c = strxor(key, msg)
    return c.encode('hex')+'\n'

def main():
    key = random(1024)
    ciphertexts = [encryptInHex(key, msg) for msg in MSGS]
    with file('ciphertexts','w') as destination:
        destination.writelines(ciphertexts)
        destination.close()


main()