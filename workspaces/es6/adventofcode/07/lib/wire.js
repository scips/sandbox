/*jslint node: true, esversion: 6*/
'use strict';
var Element = require('electrical').Element;

var Wire = class Wire extends Element {
  constructor(name) {
    super();
    if (name === undefined) {
      throw 'name is mandatory';
    }
    if (typeof name !== 'string') {
      throw 'name must be a string';
    }
    if (!/^[a-z]+$/.test(name)) {
      throw 'name must be a string in lowercase';
    }
    this.name = name;
    this.source = undefined;
    this.destinations = [];
  }
  link(from, to) {
    this.source = from;
    if (to !== undefined && this.destinations.indexOf(to) === -1) {
      // don't link twice
      this.destinations.push(to);
    }
  }
  valueOf() {
    if (this.source !== undefined) {
      return this.source.valueOf();
    }
    return undefined;
  }
};

module.exports = {
  Wire: Wire
};