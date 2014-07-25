#!/usr/bin/python

# F(k,0110)=0011  and  F(k,0101)=1010  and  F(k,1110)=0110 

k = '?????'

# k[0] xor k[2] xor k[3] = 0011
# k[0] xor k[2] xor k[4] = 1010
# k[0] xor k[1] xor k[2] xor k[3] = 0110

# ? what will be F(k,1101) = k[0] xor k[1] xor k[2] xor k[4]

# k0 xor k0 xor k0 xor k1 xor k2 xor k2 xor k2 xor k3 xor k3 xor k4

f_k_1101 = 0b0011 ^ 0b1010 ^0b0110

print bin(f_k_1101)