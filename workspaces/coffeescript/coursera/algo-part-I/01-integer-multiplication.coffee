###
Coursera > algo 001 > Week 1
============================
_by Sébastien Barbieri_

This is my sandbox to tryout exercices but in Coffeescript
###

# Algo multiplication
# -------------------
# let's add 2 numbers
#     1234
#     5678
# \-------
#     9872
#    8638
#   7404
#  6170
# \-------       
#  7006652
#

class SchoolMultiplication
  constructor:()->
    @operations = 0

  generateFactors:(n)->
    baseDigits = "1234567890"
    factor1 = ""
    factor2 = ""
    for i in [0...n]
      currentDigitF1 = baseDigits.charAt(i % baseDigits.length)
      currentDigitF2 = baseDigits.charAt((i+5) % baseDigits.length)
      factor1 = "#{factor1}#{currentDigitF1}"
      factor2 = "#{factor2}#{currentDigitF2}"
    return [factor1,factor2]

  setFirstFactor:(@firstFactor)->

  setSecondFactor:(@secondFactor)->

  multiply:()->
    toAdd = []
    sumOfFactor = 0
    for i in [0...@secondFactor.length]
      digit = parseInt(@secondFactor.charAt(@secondFactor.length-1-i))
      @operations++
      oneDigitProduct = digit * parseInt(@firstFactor)
      @operations++
      # Add left shifting if any
      sumOfFactor += oneDigitProduct * Math.pow(10,i)
      @operations++
    return sumOfFactor

  getNumberOfOperations:()->
    return @operations


mult = new SchoolMultiplication()
for i in [0..20]
  [num1,num2] = mult.generateFactors(i)
  console.log "Num1: #{num1} Num2: #{num2}"
  mult.setFirstFactor(num1)
  mult.setSecondFactor(num2)
  order =
    logi: Math.log(i)
    i: i
    i_logi: Math.log(i)*i
    i_i: i*i
    i_i_i: i*i*i
  result = mult.multiply()
  numberOfOperations = mult.getNumberOfOperations()
  for i of order
    if numberOfOperations > order[i]
      similarOrder = i
  console.log "Product of factors = #{result}"
  console.log "Number of operations: #{numberOfOperations} / (#{order.logi},#{order.i},#{order.i_logi},#{order.i_i},#{order.i_i_i})"
  console.log "Similar order: #{similarOrder}"


