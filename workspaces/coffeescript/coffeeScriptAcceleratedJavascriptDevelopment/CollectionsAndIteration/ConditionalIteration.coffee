#!/usr/local/bin/coffee
isDay = 6

makehay = () ->
	console.log("hay")

sunShines = () ->
	console.log("Sun does shine") if isDay
	isDay--
		
makehay() while sunShines()

loop
	console.log 'Home'
	break if @flag is true
	console.log 'Sweet'
	@flag = true