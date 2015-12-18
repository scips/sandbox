/* global describe, it, before, beforeEach */
/*jslint node: true, esversion: 6*/
'use strict';

var Element = require('electrical').Element;
var Wire = require('wire').Wire;
var chai = require('chai');

describe('Wire', () => {
  // use chai expect syntaxt
  var expect;
  before(() => {
    expect = chai.expect;
  });

  // constructor test exceptions && properties
  describe('constructor', () => {
    it('should handle mandatory names', () => {
      expect(() => {
        var wire = new Wire();
      }).to.throw(/mandatory/);
      expect(() => {
        var wire = new Wire(1234);
      }).to.throw(/must be a string/);
      expect(() => {
        var wire = new Wire('AZ');
      }).to.throw(/lowercase/);
      expect(() => {
        var wire = new Wire('azertyZ');
      }).to.throw(/lowercase/);
    });

    it('should have a name property set', () => {
      var wire = new Wire('wirename');
      expect(wire).to.have.property('name', 'wirename');
    });

    it('should implement Electrical Element', () => {
      var wirea = new Wire('whatever');
      expect(wirea).to.be.an.instanceof(Element);
    });
  });

  // link function should link a wire from a source to a destination
  describe('link', () => {
    it('should link from a source to a target', () => {
      var wirea = new Wire('wirea');
      var wireb = new Wire('wireb');
      var wirec = new Wire('wirec');
      wirea.link(wireb, wirec);
      expect(wirea).to.have.property('source', wireb);
      expect(wirea).to.have.property('destinations');
      expect(wirea.destinations).to.contains(wirec);
    });

    it('should link from a source to a multiple targets', () => {
      var wirea = new Wire('wirea');
      var wireb = new Wire('wireb');
      var wirec = new Wire('wirec');
      var wired = new Wire('wired');
      wirea.link(wireb, wirec);
      wirea.link(wireb, wired);
      expect(wirea).to.have.property('source', wireb);
      expect(wirea).to.have.property('destinations');
      expect(wirea.destinations).to.contains(wirec);
      expect(wirea.destinations).to.contains(wired);
    });

    it('should link from a source to a multiple targets once', () => {
      var wirea = new Wire('wirea');
      var wireb = new Wire('wireb');
      var wirec = new Wire('wirec');
      var wired = new Wire('wired');
      wirea.link(wireb, wirec);
      wirea.link(wireb, wired);
      wirea.link(wireb, wired);
      wirea.link(wireb, wirec);
      expect(wirea).to.have.property('source', wireb);
      expect(wirea).to.have.property('destinations');
      expect(wirea.destinations).to.contains(wirec);
      expect(wirea.destinations).to.contains(wired);
      expect(wirea.destinations).to.have.length(2);
    });

    it('should link from a source without destination', () => {
      var wirea = new Wire('wirea');
      var sourcea = new Wire('sourcea');
      wirea.link(sourcea);
      expect(wirea).to.have.property('source', sourcea);
      expect(wirea).to.have.property('destinations');
      expect(wirea.destinations).to.have.length(0);
    });

    it('should support link source change', () => {
      var wirea = new Wire('wirea');
      var sourcea = new Wire('sourcea');
      var sourceb = new Wire('sourceb');
      wirea.link(sourcea);
      expect(wirea).to.have.property('source', sourcea);
      wirea.link(sourceb);
      expect(wirea).to.have.property('source', sourceb);
    });
  });

  // support valueOf method from electrical.Element
  describe('valueOf', () => {
    it('should get undefined when source is not defined', () => {
      var wirea = new Wire('wirea');
      expect(wirea.valueOf()).to.eql(undefined);
    });

    it('should get an integer value from a wire', () => {
      var wirea = new Wire('wirea');
      wirea.link(1);
      expect(wirea.valueOf()).to.eql(1);
      wirea.link(3);
      expect(wirea.valueOf()).to.eql(3);
    });
  });

});