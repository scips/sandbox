#!/usr/bin/python

import sys
import os
from subprocess import call

rarFile = 'test.rar'
execUnrar = ["unrar","t","-p",rarFile]

def getPasswords(filename):
    words = []
    with open(filename,'r') as f:
        words = f.readlines()
    return words

def main():
    passwords = getPasswords('french-withoutaccent.txt')
    FNULL = open(os.devnull, 'w')
    for password in passwords:
        password = password.strip()
        execUnrar[2] = '-p'+password
        retCode = call(execUnrar,stdout=FNULL,stderr=FNULL)
        print(password,retCode)

main()