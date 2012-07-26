#!/usr/local/bin/coffee

{ok, strictEqual} = require 'assert'

obj = {
	id: 1
	firstname: 'John'
	lastname: 'Doe'
}

{lastname,firstname} = obj

console.log "Mr #{lastname}, #{firstname}"

{lastname:l,firstname:f} = obj

console.log "aka #{f} #{l}" 

obj['language']=['english','french','dutch','spanish']
{language: [motherLang,otherLang...]} = obj

console.log "speaks: #{motherLang} as mother language and #{otherLang}"

