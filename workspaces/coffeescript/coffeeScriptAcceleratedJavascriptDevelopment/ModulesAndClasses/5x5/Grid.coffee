fs = require 'fs'
# Get tiles probabilities and point value
tilesPoint = fs.readFileSync 'tilecount.txt', 'utf8'
regex = /^(\w)\s(\d+)\s(\d+)/mg
tileCountsMatched = tilesPoint.match regex
tileCounts = {}
tileValues = {}
for elem in tileCountsMatched
	do (elem) ->
		[mychar, probabilities, value] = elem.split(' ')
		tileCounts[mychar] = parseInt probabilities
		tileValues[mychar] = parseInt value

totalTiles = 0
totalTiles += count for letter, count of tileCounts

alphabet = (letter for letter of tileCounts).sort()

randomLetter = ->
	randomNumber = Math.ceil Math.random() * totalTiles	#a random number from 0 to 98 (probabilities from scrabble)
	x = 1
	for letter in alphabet
		x += tileCounts[letter]
		return letter if x > randomNumber

class Grid
	constructor: ->
		@size = size = 5
		@tiles = for x in [0...@size]
			for y in [0...@size]
				randomLetter()
	inRange: (x, y) -> 0 <= x < @size and 0 <= y < @size
	swap: ({x1,y1,x2,y2}) -> [@tiles[x1][y1], @tiles[x2][y2]] = [@tiles[x2][y2], @tiles[x1][y1]]
	rows: ->
		for x in [0...@size]
			for y in [0...@size]
				@tiles[y][x]

root = exports ? window
root.Grid = Grid
root.tileValues = tileValues