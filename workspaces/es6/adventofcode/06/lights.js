/* jshint node:true, esversion: 6 */
'use strict';

const size = 1000;

var Coord = class Coord {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
};

var Lights = class Lights {
  constructor() {
    var lights = [];
    for (var i = 0; i < size; i++) {
      lights[i] = [];
      for (var j = 0; j < size; j++) {
        lights[i][j] = 0;
      }
    }
    this.lights = lights;
  }

  modifyRectangle(modif, coordA, coordB) {
    console.log(modif, coordA, coordB);
    for (var x = coordA.x, maxX = coordB.x; x <= maxX; x++) {
      for (var y = coordA.y, maxY = coordB.y; y <= maxY; y++) {
        switch (modif) {
          case 'on':
            this.lights[x][y]++;
            break;
          case 'off':
            if (this.lights[x][y] > 0) {
              this.lights[x][y]--;
            }
            break;
          case 'toggle':
            this.lights[x][y] += 2;
            break;
        }
      }
    }
  }

  turnOn(coordA, coordB) {
    this.modifyRectangle('on', coordA, coordB);
  }

  turnOff(coordA, coordB) {
    this.modifyRectangle('off', coordA, coordB);
  }

  toggle(coordA, coordB) {
    this.modifyRectangle('toggle', coordA, coordB);
  }

  count() {
    var count = 0;
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        count += this.lights[i][j];
      }
    }
    return count;
  }

  debug() {
    var line = '';
    var printline = function printLine(len) {
      var line = '-';
      for (var i = 0; i < len; i++) {
        line += '-';
      }
      line += '-';
      console.log(line);
    };
    printline(size);
    for (var i = 0; i < size; i++) {
      line = '|';
      for (var j = 0; j < size; j++) {
        if (this.lights[i][j]) {
          line += '*';
        } else {
          line += ' ';
        }
      }
      line += '|';
      console.log(line);
    }
    printline(size);
  }
};

module.exports = {
  Lights: Lights,
  Coord: Coord
};