#!/usr/bin/python

import os
import sys
from Crypto.Cipher import AES
from Crypto.Util import Counter

BS = AES.block_size
pad = lambda s: s + (BS - len(s) % BS) * chr(BS - len(s) % BS) 
unpad = lambda s : s[0:-ord(s[-1])]

def encrypt_file(in_filename, out_filename, chunk_size, key, iv):

    ctr = Counter.new(128,initial_value=long(iv, 16))
    cipher2 = AES.new(key,AES.MODE_CTR,counter=ctr)

    with open(in_filename, 'r') as in_file:
        with open(out_filename, 'w') as out_file:
            while True:
                chunk = in_file.read(chunk_size)
                if len(chunk) == 0:
                    break
                elif len(chunk) % 16 != 0:
                    chunk = pad(chunk)
                out_file.write(cipher2.encrypt(chunk))

def decrypt_file(in_filename, out_filename, chunk_size, key, iv):
    ctr = Counter.new(128,initial_value=long(iv, 16))
    cipher2 = AES.new(key,AES.MODE_CTR,counter=ctr)

    with open(in_filename, 'r') as in_file:
        with open(out_filename, 'w') as out_file:
            while True:
                chunk = in_file.read(chunk_size)
                if len(chunk) == 0:
                    break
                out_file.write(unpad(cipher2.decrypt(chunk)))

def main():
  option = sys.argv[1]
  filename = sys.argv[2]
  key = '140b41b22a29beb4061bda66b6747e14'.decode('hex')
  iv = '4ca00ff4c898d61e1edbf1800618fb28'
  encryptedFilename = filename+'.enc'
  decryptedFilename = filename+'.dec'
  if option == 'encrypt':
    encrypt_file(filename, encryptedFilename, 8192, key, iv)
  elif option == 'decrypt':
    encrypt_file(filename, decryptedFilename, 8192, key, iv)

main()
      