/* jshint node:true, esversion: 6 */
'use strict';

var filterRules = require('./non').filterRules;

if (process.argv.length > 2) {
  var word = process.argv[2];
  if (filterRules(word)) {
    console.log('nice!');
  } else {
    console.log('naughty!');
  }
}