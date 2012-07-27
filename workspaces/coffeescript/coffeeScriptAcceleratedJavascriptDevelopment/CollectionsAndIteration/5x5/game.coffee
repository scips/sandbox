#!/usr/local/bin/coffee

GRID_SIZE = 5
MIN_WORD_LENGTH = 2

inRange = (x,y) ->
	0 <= x < GRID_SIZE and 0 <= y < GRID_SIZE

fs = require 'fs'

# Get Word List
owl2 = fs.readFileSync 'OWL2.txt', 'utf8'
regex = /^(\w+)/mg
wordList = owl2.match regex
wordList = (word for word in wordList when word.length <= GRID_SIZE)

# Get Word Definition
regex = /^(\w+)\s(.*)$/mg
Definitions = {}
definitionsMatched = owl2.match regex

for definitionMatch in definitionsMatched
	[ignore, word, definition] = definitionMatch.match /^(\w+)?\s(.*)$/
	Definitions[word] = definition

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

isWord = (word) ->
	word in wordList

isInteger = (value) ->
	value is Math.round value

grid = for i in [0...GRID_SIZE]
	for j in [0...GRID_SIZE]
		randomLetter()

printGrid = ->
	rows = for i in [0...GRID_SIZE]
		for j in [0...GRID_SIZE]
			grid[j][i]
	rowStrings = (' ' + row.join(' | ') for row in rows)
	rowSeparator = ('-' for i in [1...GRID_SIZE * 4]).join('')
	console.log '\n' + rowStrings.join("\n#{rowSeparator}\n") + '\n'

getDefintion = (word) ->
	match = Definitions[word]?.match(/<(\w+)=\w>/)
	if match
		see = match[1]
		Definitions[word] + "see: #{see} -> " + Definitions[see.toUpperCase()]
	else
		Definitions[word]

moveCount = 0
score = 0
usedWords = []

wordsThroughTile = (grid, x, y) ->
	strings = []
	for length in [MIN_WORD_LENGTH..GRID_SIZE]
		range = length - 1
		addTiles = (func) ->
			strings.push (func(i) for i in [0..range]).join('')
		for offset in [0..length]
			# Horizontal
			if inRange(x - offset, y) and inRange(x - offset + range, y)
				addTiles (i) -> grid[x - offset + i][y]
			# Vertical
			if inRange(x, y - offset) and inRange(x, y - offset + range)
				addTiles (i) -> grid[x][y - offset + i]
			# Diagonal \
			if inRange(x - offset,y - offset) and inRange(x - offset + range, y - offset + range)
				addTiles (j) -> grid[x - offset + j][y - offset + j]
			# Diagonal /
			if inRange(x - offset,y + offset) and inRange(x - offset + range, y + offset - range)
				addTiles (k) -> grid[x - offset + k][y + offset - k]
	str for str in strings when isWord str

scoreMove = (grid, swapCoordinates) ->
	{x1, x2, y1, y2} = swapCoordinates
	words = wordsThroughTile(grid, x1, y1).concat wordsThroughTile(grid,x2,y2)
	moveScore = multiplier = 0
	newWords = []
	for word in words when word not in usedWords and word not in newWords
		multiplier++
		moveScore += tileValues[letter] for letter in word
		newWords.push word
	usedWords = usedWords.concat newWords
	moveScore *= multiplier
	{moveScore, newWords}

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

# Activate stdin
stdin = process.openStdin()
stdin.setEncoding 'utf8'
# define a default callback
inputCallback = null
# Whenever something is writen on the stdin, the inputCallback is called
stdin.on 'data', (input) -> inputCallback input

promptForTile1 = ->
	printGrid()
	console.log "Input tile 1 coordinates (x, y):"
	inputCallback = (input) ->
		try
			{x, y} = strToCoordinates input
		catch e
			console.log e
			return
		promptForTile2 x,y

promptForTile2 = (x1, y1) ->
	console.log "Input tile 2 coordinates (x, y):"
	inputCallback = (input) ->
		try
			{x: x2, y: y2} = strToCoordinates input
		catch e
			console.log e
			return
		if x1 is x2 and y1 is y2
			console.log "swap different tiles please"
		else
			console.log "swapping: (#{x1},#{y1}) \"#{grid[x1-1][y1-1]}\" with (#{x2},#{y2}) \"#{grid[x2-1][y2-1]}\""
			x1--; x2--; y1--; y2--
			# do the effective swap
			[grid[x1][y1], grid[x2][y2]] = [grid[x2][y2], grid[x1][y1]]
			{moveScore, newWords} = scoreMove grid, {x1, x2, y1, y2}
			unless moveScore is 0
				console.log "You formed the following word(s):"
				for word in newWords
					console.log "#{word}: #{getDefintion(word)}"
				score += moveScore
			moveCount++
			console.log "You score after #{moveCount} moves: #{score}"
			promptForTile1()

console.log "Welcome to 5x5 game"
for x in [0..GRID_SIZE]
	for y in [0..GRID_SIZE]
		scoreMove grid, {x1: x, x2: x, y1: y, y2: y}
unless usedWords.length is 0
	console.log """
		Inially used words:
		"#{usedWords.join(', ')}"
	"""
console.log "Please choose tile in the form (x, y)"
promptForTile1()
