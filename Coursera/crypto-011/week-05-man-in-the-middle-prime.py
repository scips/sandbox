#!/usr/bin/python

import sys
import gmpy2
from gmpy2 import mpz

def  ManInTheMiddlePart1(h,g,p,B):
    hashOfVal = {}
    u = h
    ginv = gmpy2.invert(g, p)
    for x1 in range(1,B+1):
        u = (u * ginv) % p 
        hashOfVal[u]=x1
    return hashOfVal


def ManInTheMiddlePart2(hashToLookup,g,B,p):
    gb = gmpy2.powmod(g,B,p)
    u = gb
    for x0 in range(1,B+1):
        if u in hashToLookup:
            return {'x0':x0,'x1':hashToLookup[u]}
            break
        u = gmpy2.t_mod(u * gb,p)
    return {}

def main():
    p = mpz('13407807929942597099574024998205846127479365820592393377723561443721764030073546976801874298166903427690031858186486050853753882811946569946433649006084171')
    g = mpz('11717829880366207009516117596335367088558084999998952205599979459063929499736583746670572176471460312928594829675428279466566527115212748467589894601965568')
    h = mpz('3239475104050450443565264378728065788649097520952449527834792452971981976143292558073856937958553180532878928001494706097394108577585732452307673444020333')
    B = pow(2,20)
    allPossibleValue = ManInTheMiddlePart1(h,g,p,B)
    X0_X1 = ManInTheMiddlePart2(allPossibleValue,g,B,p)
    print "X0_X1:",X0_X1
    x0 = X0_X1['x0']
    x1 = X0_X1['x1']
    x = x0 * B + x1
    print "x",x
    print "h",h
    print "g^x",gmpy2.powmod(g,x,p)

main()
