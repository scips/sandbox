{Grid, tileValues} = require './Grid'

scoreMove = (dictionary, swapCoordinates) ->
	{x1, y1, x2, y2} = swapCoordinates
	words = dictionary.wordsThroughTile(x1, y1).concat dictionary.wordsThroughTile(x2, y2)
	moveScore = multiplier = 0
	newWords = []
	for word in words when dictionary.isWord(word) and dictionary.markUsed(word)
		multiplier++
		moveScore += tileValues[letter] for letter in word
		newWords.push word
	moveScore *= multiplier
	{moveScore, newWords}

class Player
	constructor: (@name, dictionary) ->
		@setDictionary dictionary if dictionary
	setDictionary: (@dictionary) ->
		@score = 0
		@moveCount = 0
	makeMove: (swapCoordinates) ->
		@dictionary.grid.swap swapCoordinates
		@moveCount++
		result = scoreMove @dictionary, swapCoordinates
		@score += result.moveScore
		result
	toString: ->
		@name ? 'Unnamed Player'

root = exports ? window
root.Player = Player