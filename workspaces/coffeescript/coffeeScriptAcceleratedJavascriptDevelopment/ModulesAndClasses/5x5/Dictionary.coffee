{Grid} = require './Grid'

class Dictionary
	constructor: (@originalWordList, grid) ->
		@setGrid grid if grid?
	setGrid: (@grid) ->
		throw new Error("Not an instance of a Grid") unless @grid instanceof Grid
		# copy all the words
		@wordList = @originalWordList.slice(0)
		# keep only words that fit the grid
		@wordList = (word for word in @wordList when word.length <= @grid.size)
		@minWordLength = Math.min.apply Math, (w.length for w in @wordList)
		@usedWords = []
		for x in [0...@grid.size]
			for y in [0...@grid.size]
				@markUsed word for word in @wordsThroughTile x, y
	markUsed: (word) ->
		@usedWords.push word unless word in @usedWords
	isWord: (word) -> word in @wordList
	isNewWord: (word) -> word not in @usedWords and word in @wordList
	wordsThroughTile: (x, y) ->
		grid = @grid
		strings = []
		for length in [@minWordLength..grid.size]
			range = length - 1
			addTiles = (func) ->
				strings.push (func(i) for i in [0..range]).join('')
			for offset in [0...length]
				# Horizontal
				if grid.inRange(x - offset, y) and grid.inRange(x - offset + range, y)
					addTiles (i) -> grid.tiles[x - offset + i][y]
				# Vertical
				if grid.inRange(x, y - offset) and grid.inRange(x, y - offset + range)
					addTiles (i) -> grid.tiles[x][y - offset + i]
				# Diagonal \
				if grid.inRange(x - offset,y - offset) and grid.inRange(x - offset + range, y - offset + range)
					addTiles (j) -> grid.tiles[x - offset + j][y - offset + j]
				# Diagonal /
				if grid.inRange(x - offset,y + offset) and grid.inRange(x - offset + range, y + offset - range)
					addTiles (k) -> grid.tiles[x - offset + k][y + offset - k]
		str for str in strings when @isWord str

root = exports ? window
root.Dictionary = Dictionary