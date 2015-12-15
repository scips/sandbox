#!/usr/bin/python
# -*- coding: utf-8 -*-

import sys
import os
import re

def getWords():
    filename = 'liste.de.mots.francais.frgut.txt'
    words = []
    with open(filename,'r') as f:
        words = f.readlines()
    return words

def replaceLetters(word):
    listFrom = [
        'à',
        'â',
        'ç',
        'é',
        'ê',
        'è',
        'ë',
        'ï',
        'î',
        'ô',
        'û'
    ]
    listTo = [
        'a',
        'a',
        'c',
        'e',
        'e',
        'e',
        'e',
        'i',
        'i',
        'o',
        'u'
    ]
    for i in range(len(listFrom)):
        word = word.replace(listFrom[i],listTo[i],50)
    return word

def removeAccent(words):
    for index in range(len(words)):
        words[index] = replaceLetters(words[index])
    return words

def main():
    words = getWords()
    words = removeAccent(words)
    print('word count',len(words))
    with open('french-withoutaccent.txt','w') as f:
        f.writelines(words)

    
main()