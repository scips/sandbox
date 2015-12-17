/* jshint node:true, esversion: 6 */
'use strict';

var NiceOrNaughty = require('./non').NiceOrNaughty;

if (process.argv.length > 2) {
  var file = process.argv[2];
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(file)
  });
  var countNice = 0,
    countNaughty = 0;
  var lines = [];
  rl.on('line', function(line) {
    lines.push(line);
    var non = new NiceOrNaughty(line);
    var isNice = non.isNice();
    var status = [non.contains3Voyels(), non.containsTwiceInARow(), non.containsSuccessive()].map(function mapfunc(value) {
      return value ? 'x' : ' ';
    }).join('|');
    status = '[' + status + ']';
    console.log('word ' + line + ' is ' + (isNice ? "nice\t" : 'naughty') + "\t" + status);
    if (isNice) {
      countNice++;
    } else {
      countNaughty++;
    }
  });
  rl.on('close', function() {
    console.log('nice words:' + countNice);
    console.log('naughty words:' + countNaughty);
    console.log('total:' + (countNaughty + countNice));
  });
}