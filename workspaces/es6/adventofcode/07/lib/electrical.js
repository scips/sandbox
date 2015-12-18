/*jslint node: true, esversion: 6*/
'use strict';

var Element = class Element {
  constructor() {

  }

  // must be implemented
  valueOf() {
    throw "not implemented exception";
  }
};

module.exports = {
  Element: Element
};