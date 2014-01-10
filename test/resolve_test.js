'use strict';

// Node.js
var fs = require('fs');
var path = require('path');

// node_modules
var grunt = require('grunt');

// Local libs
var resolve = require('../');

var expectedDir = path.join(__dirname, 'expected');

var readFile = function() {
  var filepath = path.join.apply(null, arguments);
  return fs.readFileSync(path.join(expectedDir, filepath), 'utf8');
};

var readJSON = function() {
  var filepath = path.join.apply(null, arguments);
  return JSON.parse(readFile(filepath)).join();
};

var createTestFile = function(method, pattern, dest) {
  grunt.file.write(dest, JSON.stringify(resolve[method](pattern), null, 2));
};
createTestFile('dirnameAll', ['*'], 'test/expected/dirnameAll.json');


exports['resolve'] = {
  filter: function(test) {
    test.expect(1);
    test.strictEqual(resolve.filter('chalk').join(), readJSON('filter.json'), 'should find matching dependencies');
    test.done();
  },
  filterDev: function(test) {
    test.expect(1);
    test.strictEqual(resolve.filterDev('grunt').join(), readJSON('filterDev.json'), 'should find all matching devDependencies');
    test.done();
  },
  filterAll: function(test) {
    test.expect(1);
    test.strictEqual(resolve.filterAll(['*']).join(), readJSON('filterAll.json'), 'should find all matching dependencies');
    test.done();
  },
  'filterDev wildcard support': function(test) {
    test.expect(1);
    test.equal(resolve.filterDev('grun*').join(), readJSON('wildcard.json'), 'should find all dependencies matching wildcard patterns');
    test.done();
  },
  'filterDev multiple pattern support': function(test) {
    test.expect(1);
    test.equal(resolve.filterDev(['grunt-*', '!grunt-contrib-no*']).join(), readJSON('patterns.json'), 'should find all dependencies matching multiple patterns');
    test.done();
  },
  dirname: function(test) {
    test.expect(1);
    test.equal(resolve.dirname('chalk'), readJSON('dirname.json'), 'should resolve the dirname of named dependencies');
    test.done();
  },
  dirnameDev: function(test) {
    test.expect(1);
    test.equal(resolve.dirnameDev('grunt-contrib-jshint'), readJSON('dirnameDev.json'), 'should resolve the dirname of named devDependencies');
    test.done();
  },
  dirnameAll: function(test) {
    test.expect(1);
    test.equal(resolve.dirnameAll('*'), readJSON('dirnameAll.json'), 'should resolve the dirname of named dependencies and devDependencies');
    test.done();
  },
  'dirname wildcard support': function(test) {
    test.expect(1);
    test.equal(resolve.dirnameAll(['*', '!cwd']), readJSON('dirnameWildcard.json'), 'should use multiple glob patterns to resolve the dirname of named dependencies and devDependencies');
    test.done();
  }
};