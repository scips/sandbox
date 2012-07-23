title = (text) ->
	console.log " "
	console.log text
	line = ""
	for i in [0...text.length]
		line += "="
	console.log line
	

object =
	id: 1
	firstname: 'Sébastien'
	lastname: 'Barbieri'

title "for key, value of object"
for key, value of object
	console.log "key: #{key} value: #{value}"

title "for key of object"
for key of object
	console.log "key: #{key} object.#{key}: #{object[key]}"

title "own key"
for own key of object
	console.log "key: #{key} object.#{key}: #{object[key]}"

title "arrays"
array = [1...10]
for value in array
	console.log "Array value: #{value}"

title "loop checks for string with when"
for key, value of object when typeof value is 'string'
	console.log "#{key} is a string containing #{value}"

title "for in by"
for pos in [0..3] by 1/3
	console.log pos

title "maximum"
maximum = 0
for i in [1,5,65,23,10,32] when i>maximum
	maximum = i
console.log "maximum: #{maximum}"

title "check in array or of object"
console.log 'firstname' of object
fruits = ['apple','orange','ananas']
console.log  'apple' in fruits
console.log  'letuce' in fruits