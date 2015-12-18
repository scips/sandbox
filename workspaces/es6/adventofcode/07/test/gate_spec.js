/* global describe, it, before, beforeEach */
/*jslint node: true, esversion: 6*/
'use strict';

var Element = require('electrical').Element;
var Gate = require('gate').Gate;
var And = require('gate').And;
var Or = require('gate').Or;
var Wire = require('wire').Wire;
var chai = require('chai');

describe('Gate', () => {
  // use chai expect syntaxt
  var expect;
  before(() => {
    expect = chai.expect;
  });

  // constructor test exceptions && properties
  describe('constructor', () => {
    it('should implement Electrical Element', () => {
      var gatea = new Gate();
      expect(gatea).to.be.an.instanceof(Element);
    });
  });

  describe('valueOf', () => {
    it('should still throw an exception', () => {
      expect(function ElementValueOf() {
        var element = new Element();
        element.valueOf();
      }).to.throw(/not implemented/);
    });
  });
});

describe('And', () => {
  var expect;
  before(() => {
    expect = chai.expect;
  });

  describe('constructor', () => {
    it('should implement Electrical Element', () => {
      var gateAndA = new And();
      expect(gateAndA).to.be.an.instanceof(Element);
    });
    it('should implement Gate', () => {
      var gateAndA = new And();
      expect(gateAndA).to.be.an.instanceof(Gate);
    });
  });

  describe('in', () => {
    it('should support being called with no arguments and return pin value', () => {
      var gateAndA = new And();
      expect(gateAndA.in1()).to.be.eql(undefined);
      expect(gateAndA.in2()).to.be.eql(undefined);
    });
    it('should support being called with an argument and return new pin value', () => {
      var gateAndA = new And();
      expect(gateAndA.in1()).to.be.eql(undefined);
      expect(gateAndA.in2()).to.be.eql(undefined);
      gateAndA.in1(3);
      expect(gateAndA.in1()).to.be.eql(3);
      gateAndA.in2(3);
      expect(gateAndA.in2()).to.be.eql(3);
    });
    it('should support being reset to undefined', () => {
      var gateAndA = new And();
      expect(gateAndA.in1()).to.be.eql(undefined);
      expect(gateAndA.in2()).to.be.eql(undefined);
      gateAndA.in1(3);
      gateAndA.in2(3);
      expect(gateAndA.in1()).to.be.eql(3);
      expect(gateAndA.in2()).to.be.eql(3);
      gateAndA.in1(undefined);
      gateAndA.in2(undefined);
      expect(gateAndA.in1()).to.be.eql(undefined);
      expect(gateAndA.in2()).to.be.eql(undefined);
    });
  });

  describe('valueOf', () => {
    it('should return undefined if no sources', () => {
      var gateAndA = new And();
      expect(gateAndA.valueOf()).to.eql(undefined);
    });

    it('should return undefind if only a single source is setted', () => {
      var gateAndA = new And();
      gateAndA.in1(1);
      expect(gateAndA.valueOf()).to.eql(undefined);
      var gateAndB = new And();
      gateAndB.in2(1);
      expect(gateAndB.valueOf()).to.eql(undefined);
    });

    it('should return a value if 2 sources are set', () => {
      var gateAndA = new And();
      gateAndA.in1(1);
      gateAndA.in2(1);
      expect(gateAndA.valueOf()).to.eql(1);
    });

    it('should return a bitwise AND from 2 sources', () => {
      var gateAndA = new And();
      gateAndA.in1(0xFF00);
      gateAndA.in2(0x00FF);
      expect(gateAndA.valueOf()).to.eql(0x00);

      gateAndA.in1(0xFFFF);
      gateAndA.in2(0x00FF);
      expect(gateAndA.valueOf()).to.eql(0x00FF);

      gateAndA.in1(0xFF00);
      gateAndA.in2(0xFFFF);
      expect(gateAndA.valueOf()).to.eql(0xFF00);
    });

    it('should return a bitwise AND on the value of connected sources', () => {
      var wirea = new Wire('wirea');
      var gateAndA = new And();
      gateAndA.in1(wirea);
      gateAndA.in2(0x00FF);
      expect(gateAndA.valueOf()).to.eql(undefined);
      var wireb = new Wire('wireb');
      gateAndA.in2(wireb);
      expect(gateAndA.valueOf()).to.eql(undefined);
      wirea.link(0xFF00);
      wireb.link(0xFFFF);
      expect(gateAndA.valueOf()).to.eql(0xFF00);
      gateAndA.in1(undefined);
      expect(gateAndA.valueOf()).to.eql(undefined);
    });
  });
});

describe('Or', () => {
  var expect;
  before(() => {
    expect = chai.expect;
  });

  describe('constructor', () => {
    it('should implement Electrical Element', () => {
      var gateOrA = new Or();
      expect(gateOrA).to.be.an.instanceof(Element);
    });
    it('should implement Gate', () => {
      var gateOrA = new Or();
      expect(gateOrA).to.be.an.instanceof(Gate);
    });
  });

  describe('in', () => {
    it('should support being called with no arguments and return pin value', () => {
      var gateOrA = new Or();
      expect(gateOrA.in1()).to.be.eql(undefined);
      expect(gateOrA.in2()).to.be.eql(undefined);
    });
    it('should support being called with an argument and return new pin value', () => {
      var gateOrA = new Or();
      expect(gateOrA.in1()).to.be.eql(undefined);
      expect(gateOrA.in2()).to.be.eql(undefined);
      gateOrA.in1(3);
      expect(gateOrA.in1()).to.be.eql(3);
      gateOrA.in2(3);
      expect(gateOrA.in2()).to.be.eql(3);
    });
    it('should support being reset to undefined', () => {
      var gateOrA = new Or();
      expect(gateOrA.in1()).to.be.eql(undefined);
      expect(gateOrA.in2()).to.be.eql(undefined);
      gateOrA.in1(3);
      gateOrA.in2(3);
      expect(gateOrA.in1()).to.be.eql(3);
      expect(gateOrA.in2()).to.be.eql(3);
      gateOrA.in1(undefined);
      gateOrA.in2(undefined);
      expect(gateOrA.in1()).to.be.eql(undefined);
      expect(gateOrA.in2()).to.be.eql(undefined);
    });
  });

  describe('valueOf', () => {
    it('should return undefined if no sources', () => {
      var gateOrA = new Or();
      expect(gateOrA.valueOf()).to.eql(undefined);
    });

    it('should return undefind if only a single source is setted', () => {
      var gateOrA = new Or();
      gateOrA.in1(1);
      expect(gateOrA.valueOf()).to.eql(undefined);
      var gateOrB = new Or();
      gateOrB.in2(1);
      expect(gateOrB.valueOf()).to.eql(undefined);
    });

    it('should return a value if 2 sources are set', () => {
      var gateOrA = new Or();
      gateOrA.in1(1);
      gateOrA.in2(1);
      expect(gateOrA.valueOf()).to.eql(1);
    });

    it('should return a bitwise Or from 2 sources', () => {
      var gateOrA = new Or();
      gateOrA.in1(0xFF00);
      gateOrA.in2(0x00FF);
      expect(gateOrA.valueOf()).to.eql(0xFFFF);

      gateOrA.in1(0xFFFF);
      gateOrA.in2(0x00FF);
      expect(gateOrA.valueOf()).to.eql(0xFFFF);

      gateOrA.in1(0xFF00);
      gateOrA.in2(0xFFFF);
      expect(gateOrA.valueOf()).to.eql(0xFFFF);
    });

    it('should return a bitwise Or on the value of connected sources', () => {
      var wirea = new Wire('wirea');
      var gateOrA = new Or();
      gateOrA.in1(wirea);
      gateOrA.in2(0x00FF);
      expect(gateOrA.valueOf()).to.eql(undefined);
      var wireb = new Wire('wireb');
      gateOrA.in2(wireb);
      expect(gateOrA.valueOf()).to.eql(undefined);
      wirea.link(0xFF00);
      wireb.link(0xFFFF);
      expect(gateOrA.valueOf()).to.eql(0xFFFF);
      gateOrA.in1(undefined);
      expect(gateOrA.valueOf()).to.eql(undefined);
    });
  });
});