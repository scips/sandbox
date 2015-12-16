/* jshint node:true, esversion: 6 */
'use strict';

var boxArea = function boxArea(l, w, h) {
  var rectangularPrismSurface = 2 * l * w + 2 * w * h + 2 * h * l;
  var maxValue = Math.max(l, w, h);
  var wrapping = l * w * h / maxValue;
  return rectangularPrismSurface + wrapping;
};

if (process.argv.length > 2) {
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
  });

  var sum = 0;

  rl.on('line', function(line) {
    var surface = boxArea.apply(null, line.split('x'));
    console.log(line + ' surface is ' + surface);
    sum += surface;
  });
  rl.on('close', function() {
    console.log('total surface: ' + sum);
  });
} else {
  var boxes = [
    '2x3x4',
    '1x1x10'
  ];

  var sum = 0;

  for (var i = 0, len = boxes.length; i < len; i++) {
    var surface = boxArea.apply(null, boxes[i].split('x'));
    console.log(boxes[i] + ' surface is ' + surface);
    sum += surface;
  }

  console.log('total surface: ' + sum);

}