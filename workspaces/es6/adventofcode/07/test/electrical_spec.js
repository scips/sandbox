/* global describe, it, before, beforeEach */
/*jslint node: true, esversion: 6*/
'use strict';

var Element = require('electrical').Element;
var chai = require('chai');

describe('Element', () => {
  // use chai expect syntaxt
  var expect;
  before(() => {
    expect = chai.expect;
  });

  // constructor test exceptions && properties
  describe('valueOf', () => {
    it('should throw an error not implemented', () => {
      expect(function ElementValueOf() {
        var element = new Element();
        element.valueOf();
      }).to.throw(/not implemented/);
    });
  });
});