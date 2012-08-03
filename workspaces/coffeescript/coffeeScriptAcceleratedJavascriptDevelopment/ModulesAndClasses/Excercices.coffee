root = global ? window

root.aphorism = 'Fool me 8 or more times, shame on me'

do RestoreOldAphorism = ->
	root.aphorism = 'Fool me once, shame on you'
	console.log aphorism

console.log aphorism

Genie = ->
Genie.wishesLeft = 3

Genie::grantWish = ->
	if Genie.wishesLeft > 0
		console.log 'wish granted'
		Genie.wishesLeft--

g1 = new Genie
g1.grantWish()
g1.grantWish()

g2 = new Genie
g2.grantWish()
g2.grantWish()
g2.grantWish()
g2.grantWish()

class Season
class Spring extends Season

console.log (new Season).__proto__.__proto__.__proto__
console.log (new Season).__proto__.__proto__
console.log (new Spring).__proto__.__proto__.__proto__
console.log {}.__proto__
console.log {}.__proto__.__proto__

(window ? global).property = 'global context'
@property = 'surrounding context'
class Foo
	constructor: -> @property = 'instance context'
	bar: => console.log @property
	baz: -> console.log @property

foo = new Foo
bar = foo.bar
baz = foo.baz
foo.bar()
bar()
baz()
console.log @property