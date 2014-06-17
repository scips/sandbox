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

class KaratsubaMultiplication
  constructor:()->
    @operations = 0
    @z0 = 0
    @z1 = 0
    @z2 = 0
    @result = 0

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
    @result = 0
    return @recursiveMultiplication(@firstFactor,@secondFactor)

  recursiveMultiplication:(factor1,factor2)->
    # Split in 2
    splitSize = Math.ceil(Math.max(factor2.length,factor1.length)/2)
    if ( splitSize>1 )
      # take right part
      factor1RightPart = factor1.substr(splitSize,splitSize)
      factor1LeftPart = factor1.substr(0,splitSize)
      factor2RightPart = factor2.substr(splitSize,splitSize)
      factor2LeftPart = factor2.substr(0,splitSize)
      z2 = @recursiveMultiplication(factor1LeftPart,factor2LeftPart)
      z0 = @recursiveMultiplication(factor1RightPart,factor2RightPart)
      z1 = @recursiveMultiplication(parseInt(factor1LeftPart)+parseInt(factor1RightPart),parseInt(factor2LeftPart)+parseInt(factor2RightPart)) - z2 - z0
      @operations++
      @result = z2 * Math.pow(10,splitSize*2) + z1 * Math.pow(10,splitSize) + z0
    else
      @result = parseInt(factor1) * parseInt(factor2)
      @operations++
    return @result

  getNumberOfOperations:()->
    return @operations


mult = new KaratsubaMultiplication()
for i in [40..60]
  [num1,num2] = mult.generateFactors(i)
  console.log "Num1: #{num1} Num2: #{num2}"
  mult.setFirstFactor(num1)
  mult.setSecondFactor(num2)
  order =
    logn: Math.log(i)
    n: i
    n_logn: Math.log(i)*i
    n_n: i*i
    n_n_n: i*i*i
  result = mult.multiply()
  numberOfOperations = mult.getNumberOfOperations()
  for i of order
    if numberOfOperations > order[i]
      similarOrder = i
  console.log "Product of factors = #{result}"
  console.log "Number of operations: #{numberOfOperations} / (#{order.logn},#{order.n},#{order.n_logn},#{order.n_n},#{order.n_n_n})"
  console.log "Similar order: #{similarOrder}"


