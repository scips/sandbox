/* jshint node:true, esversion: 6 */
'use strict';

var Computer = class Computer {
  constructor() {
    this.reg = {};
  }

  and(a, b) {
    return ((a & b) + 65536) % 65536;
  }

  or(a, b) {
    return ((a | b) + 65536) % 65536;
  }

  xor(a, b) {
    return ((a ^ b) + 65536) % 65536;
  }

  not(a) {
    return ((~a) + 65536) % 65536;
  }

  lshift(a, b) {
    return ((a << b) + 65536) % 65536;
  }

  rshift(a, b) {
    return ((a >> b) + 65536) % 65536;
  }
};

var Parser = class Parser {
  constructor(computer) {
    this.opCount = /^(\w+) (\w+){0,1}\s?(\w+){0,1}\s?\-\> ([a-z]+)$/;
    this.lowercase = /[a-z]+/;
    this.uppercase = /[A-Z]+/;
    this.digit = /\d+/;
    this.computer = computer;
  }

  operatorParse(instruction) {
    console.log(instruction);
    var result = this.opCount.exec(instruction);
    var a, b, c;
    if (result[2] === undefined) {
      // assign ->
      a = result[1];
      b = result[4];
      if (this.digit.test(result[1])) {
        // value -> register
        this.computer.reg[b] = parseInt(a, 10);
      } else {
        // register -> register
        this.computer.reg[b] = this.computer.reg[a];
      }
    } else {
      if (result[3] === undefined) {
        a = result[2];
        b = result[4];
        // Unary operator
        this.computer.reg[b] = this.computer.not(this.computer.reg[a]);
      } else {
        a = result[1];
        instruction = result[2].toLowerCase();
        b = result[3];
        c = result[4];
        // Binary operator
        var valueA, valueB;
        if (this.digit.test(a)) {
          valueA = a;
        } else {
          valueA = this.computer.reg[a];
        }
        if (this.digit.test(b)) {
          valueB = b;
        } else {
          valueB = this.computer.reg[b];
        }
        this.computer.reg[c] = this.computer[instruction](valueA, valueB);
      }
    }
    console.log(this.computer.reg);
  }
};

var c = new Computer();
var p = new Parser(c);

if (process.argv.length > 2) {
  var file = process.argv[2];
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });
  rl.on('line', function(line) {
    p.operatorParse(line);
  });
  rl.on('close', function() {
    console.log(c.reg);
    console.log('a:' + c.reg.a);
  });
}