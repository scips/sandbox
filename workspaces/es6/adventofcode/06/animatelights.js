/* jshint node:true, esversion: 6 */
'use strict';

var Lights = require('./lights').Lights;
var Coord = require('./lights').Coord;

var lights = new Lights();
console.log("Lights on count:" + lights.count());

if (process.argv.length > 2) {
  var file = process.argv[2];
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });
  var regExpLine = /(turn on|turn off|toggle) (\d+),(\d+) through (\d+),(\d+)$/;
  rl.on('line', function(line) {
    var result = regExpLine.exec(line);
    var coordA = new Coord(parseInt(result[2], 10), parseInt(result[3], 10));
    var coordB = new Coord(parseInt(result[4], 10), parseInt(result[5], 10));
    switch (result[1]) {
      case 'turn on':
        lights.turnOn(coordA, coordB);
        break;
      case 'turn off':
        lights.turnOff(coordA, coordB);
        break;
      case 'toggle':
        lights.toggle(coordA, coordB);
        break;
    }
    console.log("Lights on count:" + lights.count());
    //lights.debug();
  });
  rl.on('close', function() {
    console.log("Lights on FINAL count:" + lights.count());
    //lights.debug();
  });
}