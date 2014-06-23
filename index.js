/**
 * resolve-dep
 * https://github.com/jonschlinkert/resolve-dep
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';
var cwd = require('cwd');
var path = require('path');
var resolve = require('resolve');
var glob = require('globule');
var pkg = require('load-pkg');
var _ = require('lodash');


var pathResolve = function(filepath) {
  return path.resolve(filepath);
};

var normalizeSlash = function(filepath) {
  return filepath.replace(/\\/g, '/');
};

var resolveDep = function (patterns, options) {
  var locals = resolveDep.local(patterns, options);
  var npm = resolveDep.npm(patterns, options);
  return locals.concat(npm);
};

// resolve modules from the dependencies
resolveDep.npm = function (patterns, options) {
  options = options || {};
  var defaults = ['dependencies', 'devDependencies', 'peerDependencies'];
  var deps = [];
  var types = options.type || defaults;
  var configObj = options.config || pkg;

  // ensure an array
  if (!Array.isArray(types)) {
    types = [types];
  }

  // if `all` is specified, then use all the dependency collections
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
      deps = deps.concat(resolve.sync(match, {basedir: cwd()}));
    });
  }
  return deps.map(normalizeSlash);
};

resolveDep.local = function(patterns, options) {
  options = options || {};
  options.cwd = options.cwd || cwd();
  options.srcBase = options.cwd;
  options.prefixBase = true;

  var deps = [];

  // find local matches
  var matches = glob.find(patterns, options).map(pathResolve);
  if (matches.length) {
    _.each(matches, function(match) {
      try {
        try {
          deps = deps.concat(resolve.sync(match, {basedir: options.cwd}));
        } catch (resolveErr) {
          console.log('Error resolving', match);
        }
      } catch (requireErr) {
        console.log('Error requiring', match);
      }
    });
  }
  return deps.map(normalizeSlash);
};


resolveDep.deps = function (patterns, options) {
  return resolveDep.npm(patterns, _.extend({ type: 'dependencies' }, options));
};

resolveDep.dev = function (patterns, options) {
  return resolveDep.npm(patterns, _.extend({ type: 'devDependencies' }, options));
};

resolveDep.peer = function (patterns, options) {
  return resolveDep.npm(patterns, _.extend({ type: 'peerDependencies' }, options));
};



module.exports = resolveDep;