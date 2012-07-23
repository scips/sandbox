#!/usr/local/bin/coffee

sum3 = (a,b,c) -> a+b+c
console.log "sum3 1,2,3= " + sum3 1, 2, 3

# trying out
# 1st though not working 
run = (func, args...) -> func args
console.log "direct: sum3 1,2,3= " + run sum3, 1, 2, 3 
# method 1 (will work because of a side effect: func.apply(null,args)
run = (func, args...) -> func args...
console.log "direct: sum3 1,2,3= " + run sum3, 1, 2, 3 
# method 2
run = (func, args...) -> func.apply this, args
console.log "apply: sum3 1,2,3= " + run sum3, 1, 2, 3 
# method 3
run = (func, args...) -> func.call this, args...
console.log "call: sum3 1,2,3= " + run sum3, 1, 2, 3 

