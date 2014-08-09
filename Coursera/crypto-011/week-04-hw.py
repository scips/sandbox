#!/usr/bin/python

import urllib2
import sys

TARGET = 'http://crypto-class.appspot.com/po?er='
#--------------------------------------------------------------
# padding oracle
#--------------------------------------------------------------
class PaddingOracle(object):
    def printQuery(self, q):
        print "query:", q

    def query(self, q):
        target = TARGET + urllib2.quote(q)    # Create query URL
        req = urllib2.Request(target)         # Send HTTP request to server
        try:
            f = urllib2.urlopen(req)          # Wait for response
        except urllib2.HTTPError, e:          
            print "We got: %d" % e.code       # Print response code
            if e.code == 404:
                return True # good padding
            return False # bad padding
    
    def createQuery(self, iv, c):
        query = iv
        for c_i in c:
            query += c_i
        return query

    def runAttack(self, iv, c):
        # remove unecessary last cipher block
        c.pop()
        for i,e in reversed(list(enumerate(c))):
            print "c ",i, e
            c_bytes_i = e.decode('hex')
            for j in range(1,len(c_bytes_i)):
                print (1,c_bytes_i[j])
        q = self.createQuery(iv, c)
        self.printQuery(q)

if __name__ == "__main__":
    po = PaddingOracle()
    ct = sys.argv[1]
    iv = ct[0:32]
    numbOfC = (len(ct)-len(iv))/32
    c = []
    for i in range(0,numbOfC):
        byteseek = 32+i*32
        c.append(ct[byteseek:byteseek+32])
    print "c", c
    print "iv", iv
    po.runAttack(iv, c)
    # po.query(sys.argv[1])       # Issue HTTP query with the given argument
