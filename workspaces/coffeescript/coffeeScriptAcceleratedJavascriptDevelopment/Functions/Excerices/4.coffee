#!/usr/local/bin/coffee

#Implicit parentheses and function call

f = (x) -> Math.pow(x,2) + 1

console.log "X² + 1 f (0) = "+ f (0)
console.log "X² + 1 f(1) = "+ f(1)
console.log "X² + 1 f 2 = "+ f 2

y = (x,a) -> Math.pow(x,2) + a

console.log "X² + a y(3,5) = "+ y(3,5)
console.log "X² + a y 4, 5 = "+ y 4,5
# create a parse error
# console.log "X² + a y 4, 5 = "+ y 4,5
# works like the line 7 because (4) is arg 0 and 5 arg 1
console.log "X² + a y 4, 5 = "+ y (4), 5
