#!/usr/bin/python

MSGS = [
'To consider the resistance of an enciphering process to being broken we should assume that at same times the enemy knows everything but the key being used and to break it needs only discover the key from this information.'
,'The most direct computation would be for the enemy to try all 2^r possible keys, one by one.'
,'The significance of this general conjecture, assuming its truth, is easy to see. It means that it may be feasible to design ciphers that are effectively unbreakable.'
,'An enciphering-deciphering machine (in general outline) of my invention has been sent to your organization.'
]



for message in MSGS:
	print message, ' ', len(message), ((len(message)/16)+1)*16+16