/* jshint node:true, esversion: 6 */
'use strict';


var NiceOrNaughty = class NiceOrNaughty {
  constructor(str) {
    this.str = str;
    this.regexVoyels = /([a|e|i|o|u].*){3}/;
    this.regexTwice = /([a-z])\1/;
    this.regexNotContains = /ab|cd|pq|xy/;
  }
  contains3Voyels() {
    return this.regexVoyels.test(this.str);
  }
  containsTwiceInARow() {
    return this.regexTwice.test(this.str);
  }
  containsSuccessive() {
    return this.regexNotContains.test(this.str);
  }
  isNice() {
    return this.contains3Voyels() && this.containsTwiceInARow() && !this.containsSuccessive();
  }
};

var filterRules = function filterRules(word) {
  var regexpPairs = /([a-z]{2}).*\1/;
  var regexp1o1 = /([a-z]).\1/;
  return regexpPairs.test(word) && regexp1o1.test(word);
};

module.exports = {
  NiceOrNaughty: NiceOrNaughty,
  filterRules: filterRules
};