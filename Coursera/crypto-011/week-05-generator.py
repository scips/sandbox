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

def f(p):
    validg = []
    for i in range(0,p):
        missing = range(1, p)
        for pw in range(0,p-1):
            value = pow(i,pw)%p
            if missing.count(value)>0:
                missing.remove(value)
        if len(missing) <= 0:
            validg.append(i)
    return validg

def brutalFindAllInverse(p):
    invers = []
    for i in range(0, p):
        for j in range(i+1,p):
            if (i*j)%p == 1:
                invers.append(i)
                invers.append(j)
    return invers

def main():
    prime = int(sys.argv[1])
    validg = f(prime)
    print "generators for ZZ",prime," ",validg
    # invers = brutalFindAllInverse(prime)
    invers = euclidianFindAllInvers(prime)
    invers.insert(0,1)
    invers.insert(0,0)
    print "inverse in ZZ",prime,":",invers
    print "PHI ZZ",prime, " ",len(invers)

main()