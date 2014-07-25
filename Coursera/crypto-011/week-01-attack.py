#!/usr/bin/python

def strxor(a, b):     # xor two strings of different lengths
    if len(a) > len(b):
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a[:len(b)], b)])
    else:
        return "".join([chr(ord(x) ^ ord(y)) for (x, y) in zip(a, b[:len(a)])])

def main():
	CT = "09e1c5f70a65ac519458e7e53f36"
	MT = "attack at dawn"
	k = strxor(CT.decode('hex'),MT)
	print ('key',k)
	MTmodified = "attack at dusk"
	CTmodified = strxor(MTmodified,k)
	print ('CTmodified',CTmodified.encode('hex'))

main()