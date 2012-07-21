#!/usr/local/bin/coffee

# Activate stdin
stdin = process.openStdin()
stdin.setEncoding 'utf8'
# define a default callback
inputCallback = null
# Whenever something is writen on the stdin, the inputCallback is called
stdin.on 'data', (input) -> inputCallback input

promptForTile1 = ->
	console.log "Input tile 1 coordinates (x, y):"
	inputCallback = (input) ->
		promptForTile2() if strToCoordinates input

promptForTile2 = ->
	console.log "Input tile 2 coordinates (x, y):"
	inputCallback = (input) -> 
		if strToCoordinates input
			console.log "Swapping tiles"
			promptForTile1()
		else
			console.log "Not Swapping tiles"

isInteger = (value) ->
	value is Math.round value

MAX_TILES = 5
inRange = (x,y) ->
	0 <= x < MAX_TILES and 0 <= y < MAX_TILES

strToCoordinates = (input) ->
	halves = input.split(',')
	if halves.length is 2
		x = parseInt halves[0]
		y = parseInt halves[1]
		if !isInteger x or !isInteger y
			console.log "x, y must be integer value"
		else if not inRange x - 1, y - 1
			console.log "x, y must be between 0 and #{MAX_TILES}"
		else
			{x,y}
	else
		console.log "Input must be x, y"



console.log "Welcome to 5x5 game!!!"
promptForTile1()