/* jshint node:true, esversion: 6 */
'use strict';

var md5 = require('md5');

if (process.argv.length > 2) {
  var secret = process.argv[2];
  var count = 0;
  var adventtest = secret + count;
  var md5adventtest = md5(adventtest);
  while (md5adventtest.indexOf('00000') !== 0) {
    count++;
    adventtest = secret + count;
    md5adventtest = md5(adventtest);
  }
  console.log(count);
} else {
  console.log('pass secret as first parameter');
}