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
    var santa = {
      x: 0,
      y: 0
    };
    var robotSanta = {
      x: 0,
      y: 0
    };
    var houses = new House(santa.x, santa.y);

    var turn = {
      name: 'santa',
      coord: santa
    };

    for (var step = 0, len = steps.length; step < len; step++) {
      switch (steps[step]) {
        case '^':
          turn.coord.y++;
          break;
        case '<':
          turn.coord.x--;
          break;
        case 'v':
          turn.coord.y--;
          break;
        case '>':
          turn.coord.x++;
          break;
      }
      var house = houses.find(turn.coord.x, turn.coord.y);
      if (house === null) {
        house = new House(turn.coord.x, turn.coord.y);
        houses.chainlink(house);
      } else {
        house.visit();
      }
      // swith turn
      if (turn.name === 'santa') {
        turn = {
          name: 'robotSanta',
          coord: robotSanta
        };
      } else {
        turn = {
          name: 'santa',
          coord: santa
        };
      }
    }

    var housesCount = houses.count();
    console.log('House visited:' + housesCount);
    console.log('Debug print chain');
    console.log(houses.print());
  });
} else {
  console.log("Provide an input file with '^<>v' instructions");
}