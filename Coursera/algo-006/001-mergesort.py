#!/usr/bin/python

import math
import random

def mergeSort(toSort):
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
                        j+=1
                else:
                    C.append(A[i])
                    i+=1
            else:
                C.append(B[j])
                j+=1
        return C
    else:
        return toSort

def main():
    for n in range(5,10):
        toSort = random.sample(range(0,100),n)
        sortedArray = mergeSort(toSort)
        print('sorted array of size : '+str(n)+' ',toSort,sortedArray)

main()