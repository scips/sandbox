#!/usr/bin/python

import os
import sys
from Crypto.Hash import SHA256

def computeHash_i(block, previousHash):
    h = SHA256.new()
    h.update(block + previousHash)
    return h

def readFileFromTheEnd(filename):
    stat = os.stat(filename)
    fileSize = stat.st_size
    print " fileSize ",fileSize
    blocks = fileSize/1024
    remaining = fileSize % 1024
    print " Blocks of 1K: ", blocks, " + remaining: ", remaining
    f = open(filename,'rb')
    f.seek(blocks*1024)
    endOfFile = f.read(remaining)
    h_0 = SHA256.new()
    h_0.update(endOfFile)
    print "digest step # 0", h_0.hexdigest()
    h_i = h_0
    for i in range(1,blocks+1):
        f.seek((blocks-i)*1024)
        movieDataBlock = f.read(1024)
        h_i = computeHash_i(movieDataBlock, h_i.digest())
        if i > blocks -5:
            print "digest step #", i, " ", h_i.hexdigest()
    f.close()

def main():
    if len(sys.argv)>1:
        filename = sys.argv[1]
        readFileFromTheEnd(filename)

main()