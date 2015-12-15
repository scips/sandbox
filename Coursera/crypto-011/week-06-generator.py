#!/usr/bin/python

import sys

def egcd(a, b):
    x,y, u,v = 0,1, 1,0
    while a != 0:
        q, r = b//a, b%a
        m, n = x-u*q, y-v*q
        b,a, x,y, u,v = a,r, u,v, m,n
    gcd = b
    return gcd, x, y

def euclidianFindAllInvers(p):
    invers = []
    for x in range(0,p):
        gcd, ex, ey = egcd(x,p)
        if gcd == 1:
            invers.append(x)
    return invers


def main():
    prime = int(sys.argv[1])
    invers = euclidianFindAllInvers(prime)
    print "inverse in ZZ",prime,":",invers
    print "PHI ZZ",prime, " ",len(invers)

main()