#!/usr/local/bin/coffee

clearArray = (arr) ->
	arr.splice 0, arr.length

myArray = [0,1,'test',42]
console.log "myArray contains: " + myArray
console.log "clearArray native function return: " + clearArray myArray

# 1st return the cleared array
clearArray = (arr) ->
	arr.splice 0, arr.length
	arr
console.log "clearArray 2 function return: " + clearArray myArray

clearArray = (arr) ->
	arr.splice 0, arr.length
	return arr
console.log "clearArray 2bis function return: " + clearArray myArray

# 2nd return nothing
clearArray = (arr) ->
	arr.splice 0, arr.length
	return
console.log "clearArray 3 function return: " + clearArray myArray
