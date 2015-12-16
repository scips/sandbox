/* jshint node:true, esversion: 6 */
'use strict';

var House = class House {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.visitCount = 1;
    this.next = null;
  }

  // mark the house as visited one more time
  visit() {
    this.visitCount++;
  }

  // chain link a house
  chainlink(house) {
    if (this.next === null) {
      this.next = house;
    } else {
      this.next.chainlink(house);
    }
  }

  // find a house with x and y values
  find(x, y) {
    if (x === this.x && y === this.y) {
      return this;
    } else {
      if (this.next !== null) {
        return this.next.find(x, y);
      } else {
        return null;
      }
    }
  }

  countVisitedAtLeast(limit) {
    var count = 0;
    if (this.next !== null) {
      count += this.next.countVisitedAtLeast(limit);
    }
    if (this.visitCount >= limit) {
      count += 1;
    }
    return count;
  }

  print() {
    var str = '';
    str += '(' + this.x + ', ' + this.y + ') : ' + this.visitCount;
    if (this.next !== null) {
      str += ' -> ';
      str += this.next.print();
    }
    return str;
  }

  count() {
    return 1 + ((this.next !== null) ? this.next.count() : 0);
  }
};

if (process.argv.length > 2) {
  var rl = require('readline').createInterface({
    input: require('fs').createReadStream(process.argv[2])
  });

  var steps = '';

  rl.on('line', function(line) {
    steps += line;
  });
  rl.on('close', function() {
    var x = 0,
      y = 0;
    var startingHouse = new House(x, y);

    var direction = '';

    for (var step = 0, len = steps.length; step < len; step++) {
      switch (steps[step]) {
        case '^':
          y++;
          break;
        case '<':
          x--;
          break;
        case 'v':
          y--;
          break;
        case '>':
          x++;
          break;
      }
      var house = startingHouse.find(x, y);
      if (house === null) {
        house = new House(x, y);
        startingHouse.chainlink(house);
      } else {
        house.visit();
      }
    }
    console.log('House count visited at least 2:' + startingHouse.countVisitedAtLeast(2));
    console.log('House visited:' + startingHouse.count());
    console.log('Debug print chain');
    console.log(startingHouse.print());
  });
} else {
  console.log("Provide an input file with '^<>v' instructions");
}