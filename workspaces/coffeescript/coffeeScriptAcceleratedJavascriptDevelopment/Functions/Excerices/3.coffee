#!/usr/local/bin/coffee

# where impliicit parentheses fails
x = Math.round 3.0001, 4 + Math.round 2.001 , 2

console.log x 

x = Math.round( 3.0001, 4) + Math.round( 2.001 , 2)

console.log x

