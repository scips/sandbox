// jshint esversion:6
/**
 * Generate brute force 32 bits number that match test criteria
 */

test = require('./lib/nexotest.js');
getDCB32 = require('./lib/bin.js').getDCB32;

main = function main () {
  found = 0;
  for (var i=7354375, l=4008636142; i<l; i++) {
    str = getDCB32(i);
    pass = test.testAll(str);
    if (pass) {
      console.log(i, str);
      found++;
    }
  }
  console.log("Found: "+found);
};

main();