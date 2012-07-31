#!/usr/local/bin/coffee

Gift = (@name) ->
	Gift.count++
	@day = Gift.count
	@announce()

Gift.count = 0
Gift::announce = ->
	console.log "On day #{@day} of Chr. I received #{@name}"

gift1 = new Gift('a partridge in a pear tree')
gift2 = new Gift('two turtle doves')

console.log Gift.count

console.log gift1.day
console.log gift2.day

