#!/usr/local/bin/coffee

c = "c"
b = null
a = b?.d?.property ? c

console.log "1. #{a}"

console.log "2. ???"
cats?['Garfield']?.eat?() if lasagna?()

cats = []
console.log "2. cats"
cats?['Garfield']?.eat?() if lasagna?()

cats = {'Garfield'}

console.log "3. cats['Garfield']"
cats?['Garfield']?.eat?() if lasagna?()

eat = -> console.log "eating"
cat = {}
cat.eat = eat

cats['Garfield'] = cat
console.log "4. cats['Garfield'].eat"
cats?['Garfield']?.eat?() if lasagna?()

lasagna = ->
	console.log "Lasagna "
	true
console.log "5. cats['Garfield'].eat + lasagna"
cats?['Garfield']?.eat?() if lasagna?()

console.log cats
console.log cats['Garfield']
console.log cats['Garfield'].eat
console.log cats['Garfield'].eat()