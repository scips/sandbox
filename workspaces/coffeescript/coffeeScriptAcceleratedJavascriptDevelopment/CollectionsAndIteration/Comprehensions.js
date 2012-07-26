var key, keys, negativeNumbers, num, obj, value, values;

negativeNumbers = (function() {
  var _i, _results;
  _results = [];
  for (num = _i = 1; _i < 5; num = ++_i) {
    _results.push(-num);
  }
  return _results;
})();

console.log(negativeNumbers);

obj = {
  id: 1,
  firstname: 'John',
  lastname: 'Doe'
};

keys = (function() {
  var _results;
  _results = [];
  for (key in obj) {
    _results.push(key);
  }
  return _results;
})();

console.log(keys);

values = (function() {
  var _results;
  _results = [];
  for (key in obj) {
    value = obj[key];
    _results.push(value);
  }
  return _results;
})();

console.log(values);
