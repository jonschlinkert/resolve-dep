/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */
var expect = require('chai').expect;
var resolve = require('resolve');
var cwd = require('cwd');

var resolver = require('../');

describe('resolver', function () {

  describe('when dependencies are specified', function () {
    it(' ', function () {
      var expected = [resolve.sync('lodash')];
      var actual = resolver('lodash');
      expect(actual).to.eql(expected);
    });
  });

  describe('when dependencies are specified as a glob pattern', function () {
    it(' ', function () {
      var expected = [resolve.sync('lodash')];
      var actual = resolver('lod*');
      expect(actual).to.eql(expected);
    });
  });

  describe('when dependencies are specified as a glob pattern', function () {
    it(' ', function () {
      var expected = [];
      var actual = resolver('./something/that/does/not/exist.js');
      expect(actual).to.eql(expected);
    });
  });

  describe('when dependencies are specified as a glob pattern', function () {
    it(' ', function () {
      var expected = [];
      var actual = resolver('./README.md');
      expect(actual).to.eql(expected);
    });
  });

  // test foo
  describe('when dependencies are specified as a glob pattern', function () {
    it(' ', function () {
      var expected = [cwd('./index.js')];
      var actual = resolver('./index.js');
      expect(actual).to.eql(expected);
    });
  });
  // end foo

});

