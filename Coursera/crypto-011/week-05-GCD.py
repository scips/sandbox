#!/usr/bin/python

import sys
import gmpy2
from gmpy2 import mpz

def euclideExtendeAlgo(a,b,n):
    s = 0
    old_s = 1
    t = 1
    old_t = 0
    r = mpz(b)
    old_r = mpz(a)
    while r != 0:
        quotient = gmpy2.c_div(old_r,r)
        (old_r, r) = (r, old_r - quotient * r)
        (old_s, s) = (s, old_s - quotient * s)
        (old_t, t) = (t, old_t - quotient * t)       
    print "Bezout coefficients:", (old_s, old_t)
    print "greatest common divisor:", old_r
    print "quotients by the gcd:", (t, s)

def allPossiblePairs(x,y,n):
    listOfPairs = []
    for a in range(0,n):
        for b in range(0,n):
            product = (x * a + y * b ) % n
            listOfPairs.append( (a,b,product) )
    return listOfPairs

def findTargetProduct(listOfPairs,target):
    for pair in listOfPairs:
        if pair[2] == target:
            print "Found:",pair

def main():
    x = int(sys.argv[1])
    y = int(sys.argv[2])
    n = int(sys.argv[3])
    target = int(sys.argv[4])
    print "x . a + y . b = 1", "(x =",x,") (y =",y,") and n:",n
    listOfPairs = allPossiblePairs(x,y,n)
    findTargetProduct(listOfPairs,target)
    euclideExtendeAlgo(240,46,10)

main()