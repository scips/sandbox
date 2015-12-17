/* jshint node:true, esversion: 6 */
'use strict';

var filterRules = require('./non').filterRules;

if (process.argv.length > 2) {
  var file = process.argv[2];
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });
  var lines = [];
  rl.on('line', function(line) {
    lines.push(line);
  });
  rl.on('close', function() {
    var count = lines.filter(filterRules).length;
    console.log('nice #: ' + count);
  });
}