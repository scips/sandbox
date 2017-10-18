'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _symbol = require('babel-runtime/core-js/symbol');

var _symbol2 = _interopRequireDefault(_symbol);

var _loaderUtils = require('loader-utils');

var _loaderUtils2 = _interopRequireDefault(_loaderUtils);

var _normalizePath = require('normalize-path');

var _normalizePath2 = _interopRequireDefault(_normalizePath);

var _createEntry = require('../util/createEntry');

var _createEntry2 = _interopRequireDefault(_createEntry);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KEY = (0, _symbol2.default)('entryConfig');

var EntryConfig = function () {
  function EntryConfig() {
    (0, _classCallCheck3.default)(this, EntryConfig);

    this.files = [];
  }

  (0, _createClass3.default)(EntryConfig, [{
    key: 'addFile',
    value: function addFile(file) {
      var normalizedFile = (0, _normalizePath2.default)(file);
      this.files.push(normalizedFile);
    }
  }, {
    key: 'removeFile',
    value: function removeFile(file) {
      var normalizedFile = (0, _normalizePath2.default)(file);
      this.files = this.files.filter(function (f) {
        return f !== normalizedFile;
      });
    }
  }, {
    key: 'getFiles',
    value: function getFiles() {
      return this.files;
    }
  }]);
  return EntryConfig;
}();

var entryLoader = function entryLoader() {
  var _this = this;

  var config = this.options[KEY];

  // Remove all dependencies of the loader result
  this.clearDependencies();

  var dependencies = config.getFiles().map(function (file) {
    return _loaderUtils2.default.stringifyRequest(_this, file);
  });

  // add all entries as dependencies
  dependencies.forEach(this.addDependency.bind(this));

  // build source code
  var sourceCode = (0, _createEntry2.default)(dependencies);

  this.callback(null, sourceCode, null);
};

module.exports = entryLoader;
module.exports.KEY = KEY;
module.exports.EntryConfig = EntryConfig;