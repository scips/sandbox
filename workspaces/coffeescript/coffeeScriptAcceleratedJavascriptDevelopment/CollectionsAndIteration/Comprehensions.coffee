#!/usr/local/bin/coffee

negativeNumbers = (-num for num in [1...5])

console.log negativeNumbers

obj = {
	id: 1
	firstname: 'John'
	lastname: 'Doe'
}

keys = (key for key of obj)

console.log keys

values = (value for key,value of obj)

console.log values

evens = (x for x in [0..10] by 2)
odds = (x for x in [1..11] by 2)

console.log evens + " " + odds

isInteger = (x) -> x is Math.round x

listNumberThatDivide = (x) ->
	num for num in [1..x] when isInteger(x/num)

isPrimary = (x) ->
	listNumberThatDivide(x)?.length is 2

console.log listNumberThatDivide 917
console.log listNumberThatDivide 123

primaryFirst = (i for i in [0..1000] when isPrimary i)

console.log primaryFirst
count = 0
primaryNumbers = (count++ for i in [0..100000] when isPrimary i)

console.log "There are #{count} primary numbers between 0 and 100000"