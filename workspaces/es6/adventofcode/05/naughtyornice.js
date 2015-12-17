/* jshint node:true, esversion: 6 */
'use strict';

var NiceOrNaughty = require('./non').NiceOrNaughty;

if (process.argv.length > 2) {
  var word = process.argv[2];
  var niceOrNaughty = new NiceOrNaughty(word);
  console.log('word: ' + word + ' (contains3Voyels: ' + (niceOrNaughty.contains3Voyels() ? 'true' : 'false') + ')');
  console.log('word: ' + word + ' (containsTwiceInARow: ' + (niceOrNaughty.containsTwiceInARow() ? 'true' : 'false') + ')');
  console.log('word: ' + word + ' (containsSuccessive: ' + (niceOrNaughty.containsSuccessive() ? 'true' : 'false') + ')');
  console.log('word: ' + word + ' (isNice: ' + (niceOrNaughty.isNice() ? 'true' : 'false') + ')');
}