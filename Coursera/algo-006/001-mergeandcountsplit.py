#!/usr/bin/python

import math
import random

inversionsCount = 0

def mergeSort(toSort):
    global inversionsCount
    C=[]
    n = len(toSort)
    n_1 = n - 1
    if(n>1):
        splitInteger = int(math.floor((n)/2))
        A = toSort[0:splitInteger]
        A = mergeSort(A)
        B = toSort[splitInteger:n]
        B = mergeSort(B)
        i=0
        j=0
        for k in range(0,n):
            if i<len(A):
                if j<len(B):
                    if A[i]<B[j]:
                        C.append(A[i])
                        i+=1
                    else:
                        C.append(B[j])
                        inversionsCount+=len(A)-i
                        j+=1
                else:
                    C.append(A[i])
                    i+=1
            else:
                C.append(B[j])
                inversionsCount+=len(A)-i
                j+=1
        return C
    else:
        return toSort

def main():
    global inversionsCount
    for n in range(5,10):
        inversionsCount = 0
        toSort = random.sample(range(0,100),n)
        sortedArray = mergeSort(toSort)
        print('sorted array of size : '+str(n)+' ',toSort,sortedArray, inversionsCount)

main()