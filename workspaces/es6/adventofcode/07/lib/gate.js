/*jslint node: true, esversion: 6*/
'use strict';
var Element = require('electrical').Element;

var Gate = class Gate extends Element {
  in1(element) {
    if (arguments.length === 1) {
      this.wireIn1 = element;
    }
    return this.wireIn1;
  }
  in2(element) {
    if (arguments.length === 1) {
      this.wireIn2 = element;
    }
    return this.wireIn2;
  }

};
var And = class And extends Gate {
  constructor() {
    super();
    this.wireIn1 = undefined;
    this.wireIn2 = undefined;
    this.wireOut = undefined;
  }
  valueOf() {
    if (this.wireIn1 !== undefined && this.wireIn2 !== undefined) {
      var in1 = this.wireIn1.valueOf();
      var in2 = this.wireIn2.valueOf();
      if (in1 === undefined || in2 === undefined) {
        return undefined;
      }
      return in1 & in2;
    }
    return undefined;
  }
};
var Or = class Or extends Gate {
  valueOf() {
    if (this.wireIn1 !== undefined && this.wireIn2 !== undefined) {
      var in1 = this.wireIn1.valueOf();
      var in2 = this.wireIn2.valueOf();
      if (in1 === undefined || in2 === undefined) {
        return undefined;
      }
      return in1 | in2;
    }
    return undefined;
  }
};

module.exports = {
  Gate: Gate,
  And: And,
  Or: Or
};