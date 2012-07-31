#!/usr/local/bin/coffee

# 1

original = ['Mary','Poppins']
copy = original[0..] ## array copy
copy[0] = 'Sh' + copy[0][1..]
copy[1] = 'B' + copy[1][1..]
console.log 'Original: ' + original.join ' '
console.log 'Copy: ' + copy.join ' '

## without slice

copy = original ## address copy
copy[0] = 'Sh' + copy[0][1..]
copy[1] = 'B' + copy[1][1..]
console.log 'Original: ' + original.join ' '
console.log 'Copy: ' + copy.join ' '

# 3

for x in [1, 2]
	setTimeout (-> console.log x), 5

console.log x

for x in [3, 4, 5]
	do (x) ->
		setTimeout (-> console.log x), 5

console.log x

# 4

objContains = (obj, val) ->
	for key,value of obj
		if val is value
			return true
	return false

o1 = {brol: 1}
console.log "o1 does not contains 'foo' " + objContains o1, 'foo'
console.log "o1 does contains 1 " + objContains o1, 1


# 6

words = ['AA','BBB','CCCC']
minimum = Math.min.apply Math, (w.length for w in words)

console.log "Minimum: " + minimum
