fs = require 'fs'

owl2 = fs.readFileSync 'OWL2.txt', 'utf8'

definitionsMatched = owl2.match /^(\w+)\s(.*)$/mg

wordList = []
DefinitionsJS = []

for definitionMatch in definitionsMatched
	[ignore, word, definition] = definitionMatch.match /^(\w+)?\s(.*)$/
	definition = definition.replace /\"/g,'\\"'
	DefinitionsJS.push "'#{word}':\"#{definition}\""
	wordList.push word

fileContents = """
	root = typeof exports === "undefined" ? window : exports;
	root.OWL2 = ['#{wordList.join("',\n'")}']
"""
fs.writeFile 'OWL2.js', fileContents


fileContents = """
	root = typeof exports === "undefined" ? window : exports;
	root.OWL2Definitions = {#{DefinitionsJS.join(",\n")}}
"""
fs.writeFile 'OWL2Definitions.js', fileContents