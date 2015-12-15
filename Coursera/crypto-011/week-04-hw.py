#!/usr/bin/python

import urllib2
import sys
from M2Crypto.util import pkcs7_pad
from Crypto.Cipher import AES

def oracle(data):
    iv = data[0:32]
    ct = data[32:]
    _cipher = AES.new(key, AES.MODE_CBC, iv.decode('hex'))
    ptext = _cipher.decrypt(ct.decode('hex'))
    plen = ord(ptext[-1])
    padding_is_good = (ptext[-plen:] == chr(plen) * plen)
    return padding_is_good



TARGET = 'http://crypto-class.appspot.com/po?er='
#--------------------------------------------------------------
# padding oracle
#--------------------------------------------------------------
class PaddingOracle(object):
    def __init__(self):
        self.gList = []
        self.ordered = [
             32, 101, 116,  97, 111, 110, 105, 115, 114, 104, 108, 100, 117,  99, 121, 109, 
            119, 103, 102, 112,  46,  98,  10, 118, 107,  44,  13,  73,  39,  45,  84,  83, 
             65,  47,  67,  77,  87,  49,  66, 120,  34,  50,  48,  41,  80, 106,  72,  40, 
             33,  79,  68,  76,  58,  78,  63,  82,  70,  69,  71, 122,  89,  51, 113,  38, 
             56,  59,  53,  86,  52,  74,  62,  35,  55,  85,  75,  60,  54,  95,  57,  36, 
             61,  90,  37,  42,  81,  88,  43,  91,  93,  64,   9, 126,  96,  94, 125, 123, 
            124,  92,  16,   1,  20,   0,  11,  12, 127, 128, 129, 130, 131, 132, 133, 134, 
            135, 136, 137, 138, 139, 140, 141,  14, 142, 143, 144, 145, 146, 147, 148, 149, 
            150, 151,  15, 152, 153, 154, 155, 156, 157, 158, 159, 160, 161, 162, 163, 164, 
            165, 166, 167, 168, 169, 170, 171,  17, 172, 173, 174, 175, 176, 177, 178, 179, 
            180, 181,  18, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191,  19, 192, 193, 
            194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 
            210, 211,  21, 212, 213, 214, 215, 216, 217, 218, 219,   2, 220, 221,  22, 222, 
            223, 224, 225, 226, 227, 228, 229, 230, 231,  23, 232, 233, 234, 235, 236, 237, 
            238, 239, 240, 241,  24, 242, 243, 244, 245, 246, 247, 248, 249, 250, 251,  25, 
            252, 253, 254, 255,  26,  27,  28,  29,  30,  31,   3,   4,   5,   6,   7,   8
        ]

    def printQuery(self, q):
        print "query:", q

    def query(self, q):
        target = TARGET + urllib2.quote(q)    # Create query URL
        req = urllib2.Request(target)         # Send HTTP request to server
        try:
            f = urllib2.urlopen(req)          # Wait for response
        except urllib2.HTTPError, e:
            if e.code == 404:
                return True # good padding
            return False # bad padding
    
    def createQuery(self, c, new_c_bytes_i, c_index):
        query = ""
        for i in range(0,c_index):
            query += c[i]
        query += "".join(new_c_bytes_i).encode('hex')
        for i in range(c_index+1,len(c)):
            query += c[i]
        return query

    def padPKCS_7(self, size):
        pad = []
        for i in range(0,size):
            pad.append(size)
        return pad

    def runAttack(self, c):
        for i in range(len(c)-2,-1,-1):
            c_i = c[i]
            print "c ", i, c_i
            self.runAttackOnABlock(c, i, c_i)

    def runAttackOnABlock(self, c, c_index, c_i_value):
        guess = range(0,16)
        bytes = list(c_i_value.decode('hex'))
        for i in range(len(bytes)-1,-1,-1):
            byte = bytes[i]
            print i, byte.encode('hex')
            padding_value = 16 - i
            for g in self.ordered:
                guess[i] = g
                new_byte = ord(byte) ^ g ^ padding_value
                new_c = bytes[0:i]
                new_c.append(chr(new_byte))
                for pad in range(1,padding_value):
                    new_padding = ord(bytes[i+pad]) ^ guess[i+pad] ^ padding_value
                    new_c.append(chr(new_padding))
                q = self.createQuery(c, new_c, c_index)
                if self.query(q):
                    self.gList.insert(0,(g,chr(g)))
                    break
            print "gList for current block:", self.gList

if __name__ == "__main__":
    po = PaddingOracle()
    ct = sys.argv[1]
    iv = ct[0:32]
    numbOfC = (len(ct)-len(iv))/32
    c = []
    c.append(iv)
    for i in range(0,numbOfC):
        byteseek = 32+i*32
        c.append(ct[byteseek:byteseek+32])
    print "c", c
    po.runAttack(c)
    # po.query(sys.argv[1])       # Issue HTTP query with the given argument
    print "Final", po.gList
