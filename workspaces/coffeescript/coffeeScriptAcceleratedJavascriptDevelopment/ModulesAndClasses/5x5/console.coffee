{Dictionary} = require './Dictionary'
{Grid} = require './Grid'
{Player} = require './Player'
{OWL2} = require './OWL2'
{OWL2Definitions} = require './OWL2Definitions'
{Colors} = require './Colors'

grid = dictionary = currPlayer = player1 = player2 = null

isInteger = (value) ->
	value is Math.round value

printGrid = (swapCoordinates) ->
	rows = grid.rows()
	if(swapCoordinates)
		rows[swapCoordinates.y1][swapCoordinates.x1]="#{Colors.red}#{rows[swapCoordinates.y1][swapCoordinates.x1]}#{Colors.reset}"
		rows[swapCoordinates.y2][swapCoordinates.x2]="#{Colors.green}#{rows[swapCoordinates.y2][swapCoordinates.x2]}#{Colors.reset}"
	rowStrings = (' ' + row.join(' | ') for row in rows)
	rowSeparator = ('-' for i in [1...grid.size * 4]).join('')
	console.log '\n' + rowStrings.join("\n#{rowSeparator}\n") + '\n'

getDefintion = (word) ->
	match = OWL2Definitions[word]?.match(/<(\w+)=\w>/)
	if match
		see = match[1]
		OWL2Definitions[word] + "see: #{see} -> " + OWL2Definitions[see.toUpperCase()]
	else
		OWL2Definitions[word]

strToCoordinates = (input) ->
	halves = input.split(',')
	if halves.length is 2
		x = parseInt halves[0]
		y = parseInt halves[1]
		if !isInteger x or !isInteger y
			console.log "x, y must be integer value"
		else if not grid.inRange x - 1, y - 1
			console.log "x, y must be between 0 and #{grid.size}"
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

promptForTile1 = (swapCoordinates)->
	printGrid(swapCoordinates)
	console.log "#{currPlayer}, Input tile 1 coordinates (x, y):"
	inputCallback = (input) ->
		try
			{x, y} = strToCoordinates input
		catch e
			console.log e
			return
		promptForTile2 x,y

promptForTile2 = (x1, y1) ->
	console.log "#{currPlayer}, Input tile 2 coordinates (x, y):"
	inputCallback = (input) ->
		try
			{x: x2, y: y2} = strToCoordinates input
		catch e
			console.log e
			return
		if x1 is x2 and y1 is y2
			console.log "swap different tiles please"
		else
			console.log "swapping: (#{x1},#{y1}) \"#{grid.tiles[x1-1][y1-1]}\" with (#{x2},#{y2}) \"#{grid.tiles[x2-1][y2-1]}\""
			x1--; x2--; y1--; y2--
			# do the effective swap
			{moveScore, newWords} = currPlayer.makeMove {x1, y1, x2, y2}
			unless moveScore is 0
				console.log """
				#{Colors.red}#{currPlayer}#{Colors.reset} formed the following #{newWords.length} word(s)
				#{newWords.join(', ')}
				earning #{moveScore / newWords.length}x#{newWords.length} = #{moveScore} points
				"""
				for word in newWords
					console.log "#{word}: #{getDefintion(word)}"
				console.log """
				#{currPlayer}'s score after #{currPlayer.moveCount} moves: #{currPlayer.score}
				"""
			currPlayer = if currPlayer is player1 then player2 else player1
			promptForTile1({x1, y1, x2, y2})

newGame = ->
	grid = new Grid
	dictionary = new Dictionary(OWL2, grid)
	currPlayer = player1 = new Player('Player 1', dictionary)
	player2 = new Player('Player 2', dictionary)
	console.log "Welcome to #{Colors.green}#{grid.size}#{Colors.reset}x#{Colors.green}#{grid.size}#{Colors.reset}!"
	unless dictionary.usedWords.length is 0
		console.log """
			Initially used words:
			#{dictionary.usedWords.join(', ')}	  
		"""
	promptForTile1()

newGame()