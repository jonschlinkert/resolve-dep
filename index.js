/**
 * resolve-dep
 * https://github.com/jonschlinkert/resolve-dep
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';
var resolve = require('resolve');
var glob = require('globule');
var _ = require('lodash');
var pkg = require('load-pkg');
var cwd = require('cwd');

module.exports = function (patterns, options) {
  var npm = exports.npm(patterns, options);
  var locals = exports.local(patterns, options);
  return npm.concat(locals);
};

// resolve modules from the dependencies
exports.npm = function (patterns, options) {
  options = options || {};
  var defaults = ['dependencies', 'devDependencies', 'peerDependencies'];
  var deps = [];
  var types =  options.deps || defaults;
  var configObj = options.config || pkg;

  // ensure an array
  if (!Array.isArray(types)) {
    types = [types];
  }

  // if all is specified, then use all the dependency collections
  if (_.contains(types, 'all')) {
    types = defaults;
  }

  // find all the collections from the package.json
  var modules = _.map(types, function(type) {
    return _.keys(configObj[type]);
  });

  var matches = glob.match(patterns, modules, options);
  if (matches.length) {
    _.each(matches, function(match) {
      deps = deps.concat(resolve.sync(match));
    });
  }
  return deps;
};

exports.local = function(patterns, options) {
  options = options || {};
  var deps = [];

  // find local matches
  var matches = glob.find(patterns, options);
  if (matches.length) {
    _.each(matches, function(match) {
      try {
        // if not requirable, don't try to resolve the path
        require(cwd(match));
        try {
          deps = deps.concat(resolve.sync(cwd(match)));
        } catch (resolveErr) {
          console.log('Error resolving', match);
        }
      } catch (requireErr) {
        console.log('Error requiring', match);
      }
    });
  }
  return deps;
};

exports.deps = function (patterns, options) {
  return exports.npm(patterns, _.extend({ type: 'dependencies' }, options));
};

exports.dev = function (patterns, options) {
  return exports.npm(patterns, _.extend({ type: 'devDependencies' }, options));
};

exports.peer = function (patterns, options) {
  return exports.npm(patterns, _.extend({ type: 'peerDependencies' }, options));
};

