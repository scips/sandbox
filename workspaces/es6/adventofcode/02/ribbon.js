/* jshint node:true, esversion: 6 */
'use strict';

var ribbon = function ribbon(w, l, h) {
  var bow = w * l * h;
  var maxValue = Math.max(w, l, h);
  var length = w * 2 + l * 2 + h * 2 - maxValue * 2;
  return bow + length;
};

if (process.argv.length > 2) {
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
  });

  var sum = 0;

  rl.on('line', function(line) {
    var surface = ribbon.apply(null, line.split('x'));
    console.log(line + ' surface is ' + surface);
    sum += surface;
  });
  rl.on('close', function() {
    console.log('total surface: ' + sum);
  });
}