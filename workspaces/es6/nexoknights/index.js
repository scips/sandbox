// jshint esversion:6
/*
 * SHDPWR/2819721237/5/635989426753126650/635992018753126650/0 -> http://www.shieldpowerlist.com/axl-shield-powers/402-nexo-blade/
 * SHDPWR/306828009 /5/635989418823126650/635992010823126650/0
 * SHDPWR/295885090 /5/635989416763126650/635992008763126650/0
 *
 * Conditions:
 *  1° Max 3 bit à 1 consécutif séparé par 1+ bits à 0
 *    1110 ok
 *    1111 pas ok
 *  2° Min 3 par côté (séquence de 12 bits, 10 bits, 12 bits)
 *  3° Coronaire du 2 et du 1
 *    la valeur minimale est la suivante
 *    seq1: 000000000111 seq2: 0000000111 seq3: 000000000111 => 00000000011100000011100000000111 => 7354375
 *    la valeur maximale est la suivante
 *    seq1: 111011101110 seq2: 0111011101 seq3: 111011101110 => 11101110111011101110111011101110 => 4008636142
 */
test = require('./lib/nexotest.js');
getDCB32 = require('./lib/bin.js').getDCB32;


main = function main (decimal) {
  console.log(decimal);
  str = getDCB32(decimal);  
  console.log(str);
  console.log(str.length);

  tests = [test.testSides, test.testMaxConsecutive1, test.testAll];

  for (var i in tests) {
    pass = tests[i](str);
    console.log('test '+i+': '+(pass?'pass':'fail'));
  }
};

main(process.argv[2]);