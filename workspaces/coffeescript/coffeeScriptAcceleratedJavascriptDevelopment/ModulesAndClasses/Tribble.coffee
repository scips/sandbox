class Tribble
	constructor: ->
		@isAlive = true
		Tribble.count++
	#Prototype properties
	breed: -> new Tribble if @isAlive
	die: ->
		Tribble.count-- if @isAlive
		@isAlive = false
	#class level properties
	@count: 0
	@makeTrouble: -> console.log ('Trouble!'+i for i in [1..@count]).join(' ')

tribble1 = new Tribble
tribble2 = new Tribble
Tribble.makeTrouble()
tribble2.die()
Tribble.makeTrouble()
tribble2.breed() # already dead couldn't breed
tribble1.breed().breed().breed()
Tribble.makeTrouble()

stringVersion = "2.2.1.3"
version = parseInt(stringVersion.split('.')[0])+0.1*parseInt((0+stringVersion.split('.')[1]?))
console.log version

stringVersion = "2"
version = (string) -> parseInt(stringVersion.split('.')[0])+0.1*parseInt((0+stringVersion.split('.')[1]?))
console.log version stringVersion

class A
	constructor: ->
		@name = A.name

class B extends A
	constructor: ->
		@name = B.name

a = new A

b = new B

console.log A.name
console.log B.name

console.log a.name
console.log b.name

class Pet
	constructor: -> @isHungry = true
	eat: -> @isHungry = false

class Dog extends Pet
	eat: ->
		console.log '*crunch, crunch*'
		super()
	fetch: ->
		console.log 'Yip yip!'
		@isHungry = true

dog1 = new Dog

dog1.eat()
console.log dog1.isHungry
dog1.fetch()
console.log dog1.isHungry
dog1.eat()
dog1.eat()

class Shape
	constructor: (@width) ->
	computeArea: -> throw new Error('I am an abstract class!')

class Square extends Shape
	computeArea: -> Math.pow @width, 2

class Circle extends Shape
	radius: -> @width / 2
	computeArea: -> Math.PI * Math.pow @radius(), 2

showArea = (shape) ->
	unless shape instanceof Shape
		throw new Error('showArea requires a Shape instance')
	console.log shape.computeArea()

showArea new Square(2)
showArea new Circle(2)

class Starship
	constructor: (@name) ->
	travelSpace: () -> console.log "#{@name} is travelling to space"

class Enterprise extends Starship
	constructor: (name) ->
		super

class Voyager extends Starship
	constructor: (name) ->
		super

requisitionStarship = (captain) ->
	switch captain
		when 'Kirk', 'April', 'Pike', 'Decker', 'Spock'
			new Enterprise('Constitution')
		when 'Picard', 'Riker', 'Jellico'
			new Enterprise('Galaxy')
		when 'Archer', 'T\'Pol', 'Forrest'
			new Enterprise('NX')
		when 'Janeway'
			new Voyager('Intrepid')
		else
			throw new Error('Invalid starship catpain')

requisitionStarship('Kirk').travelSpace()
requisitionStarship('Picard').travelSpace()
requisitionStarship('Riker').travelSpace()
requisitionStarship('Janeway').travelSpace()


