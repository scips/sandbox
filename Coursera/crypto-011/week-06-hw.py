#!/usr/bin/python
# -*- coding: utf8 -*-
import gmpy2
from gmpy2 import mpz

def Question1(N):
    # we know that |p−q|<2N^(1/4)
    # we want to find the smallest: p
    found = False
    A = mpz(gmpy2.ceil(gmpy2.sqrt(N)))
    x = mpz(gmpy2.sqrt((A**2)-N))
    print "x",x
    p = A - x
    q = A + x
    return (p,q)

def Question2(N):
    found = False
    sqrtN = gmpy2.sqrt(N)
    A = mpz(gmpy2.ceil(sqrtN))
    upperLimit = pow(2,20)
    while A-sqrtN < upperLimit and not found:
        x = mpz(gmpy2.sqrt((A**2)-N))
        p = A - x
        if gmpy2.is_prime(p):
            q = A + x
            if (N-(p*q)) == 0:
                return (p,q)
        A += 1

def Question3(N):
    A = mpz(gmpy2.ceil(gmpy2.sqrt(24*N)))
    x = mpz(gmpy2.sqrt( (A ** 2) - (24 * N) ))
    p1 = (A - x)/6
    p2 =  (A + x)/6
    q1 = (A + x)/4
    q2 = (A - x)/4
    if gmpy2.is_prime(p1):
        p = p1
    else:
        p = p2
    if gmpy2.is_prime(q1):
        q = q1
    else:
        q = q2
    return (p,q)


def main():
    ctx = gmpy2.get_context()
    ctx.precision = 900
    gmpy2.set_context(ctx)

    """
    N1 = mpz('179769313486231590772930519078902473361797697894230657273430081157732675805505620686985379449212982959585501387537164015710139858647833778606925583497541085196591615128057575940752635007475935288710823649949940771895617054361149474865046711015101563940680527540071584560878577663743040086340742855278549092581')
    (p,q) = Question1(N1)
    print "Answer is :",p
    print "N = p*q <=> N - (p*q)=", N1-(p*q)
    print "is p prime?",gmpy2.is_prime(p)

    N2 = mpz('648455842808071669662824265346772278726343720706976263060439070378797308618081116462714015276061417569195587321840254520655424906719892428844841839353281972988531310511738648965962582821502504990264452100885281673303711142296421027840289307657458645233683357077834689715838646088239640236866252211790085787877')
    (p,q) = Question2(N2)
    print "Answer is :",p
    print "N = p*q <=> N - (p*q)=", N2-(p*q)
    print "is p prime?",gmpy2.is_prime(p)
    """

    N3 = mpz('72006226374735042527956443552558373833808445147399984182665305798191 \
    63556901883377904234086641876639384851752649940178970835240791356868 \
    77441155132015188279331812309091996246361896836573643119174094961348 \
    52463970788523879939683923036467667022162701835329944324119217381272 \
    9276147530748597302192751375739387929')
    (p,q) = Question3(N3)
    print "Answer is :",p
    print "N = p*q <=> N - (p*q)=", N3 - (p*q)
    print "is p prime?",gmpy2.is_prime(p)

main()