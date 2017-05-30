// Test that each side have at least 3 '1'
testSides = function testSides (bitstr) {
  matches = bitstr.match(/^([01]{12})([01]{8})([01]{12})/);
  left = matches[1];
  top  = matches[1][11]+matches[2]+matches[3][0];
  right = matches[3];
  sides = [left, top, right];
  for (var side in sides) {
    cnt1 = 0;
    for (var i in sides[side]) {
      if (sides[side][i] == '1') {
        cnt1++;
      }
    }
    // if one side have less then 3 '1' exit
    if (cnt1 < 3) return false;
  }
  return true;
};

// Test that there are at most 3 consecutive '1's 
testMaxConsecutive1 = function testMaxConsecutive1 (bitstr) {
  cnt = 0;
  for (var i in bitstr) {
    if (bitstr[i] == '0') {
      cnt = 0;
    } else {
      cnt ++;
    }
    if (cnt > 3) return false;
  }
  return true;
};

testAll = function testAll (bitstr) {
  return testSides(bitstr) && testMaxConsecutive1(bitstr);
};


exports.testSides = testSides;
exports.testMaxConsecutive1 = testMaxConsecutive1;
exports.testAll = testAll;