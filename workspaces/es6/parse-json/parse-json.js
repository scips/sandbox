#!/usr/bin/env node

const argv = require('yargs').argv;

let stdin = process.stdin,
    stdout = process.stdout,
    inputJSON = "",
    // needle in the form key1.key2.key3
    needles = argv._.map((elem) => {return elem.split('.')});

stdin.resume();
stdin.setEncoding('utf8');

stdin.on('data', function (chunk) {
    inputJSON += chunk;
});

stdin.on('end', function () {
    let parsedData = JSON.parse(inputJSON);
    let founds = [];
    for(let needle of needles) {
      console.log("Searching: ", needle);
      console.log(traverse(parsedData, needle));
    }

});

// needle is an array of at least one item stacked by going deeper in the json
function traverse(jsonData, needle) {
  let currentStage = needle[0];
  if (Array.isArray(jsonData)) {
    // map reduce the array
    return jsonData.map(function (elem, i) {
      return traverse(elem, needle);
    });
  } else {
    if (jsonData === Object(jsonData)) {
      // check if key exists
      if (jsonData[currentStage]) {
        if (needle.length == 1) {
          // we reached the end
          return jsonData[currentStage];
        } else {
          // go deeper
          return traverse(jsonData[currentStage], needle.slice(1));
        }
      }
    }
  }
}
