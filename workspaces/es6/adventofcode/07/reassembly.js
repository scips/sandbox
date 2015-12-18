/* jshint node:true, esversion: 6 */
'use strict';

var Wires = class Wires {
  constructor(name, source) {
    this.name = name;
    // Can be another wire, a gate or a digit
    this.source = source;
    this.destinations = [];
  }

  connectTo(destination) {
    this.destination.push(destination);
  }
};

var Gates = class Gates {
  constructor() {}
};

var AndGate = class AndGate extends Gates {

};