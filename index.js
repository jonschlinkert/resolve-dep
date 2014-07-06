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
var normalize = require('normalize-path');
var glob = require('globby');
var multimatch = require('multimatch');
var pkg = require('load-pkg');
var _ = require('lodash');


/**
 * Utils
 */

var pathResolve = function (filepath) {
  return path.resolve(filepath);
};

var normalizeSlash = function (filepath) {
  return filepath.replace(/\\/g, '/');
};


/**
 * .resolveDep
 *
 * Resolve both npm packages and local modules by:
 *
 *  1. Attempting to expand glob patterns to local modules, then
 *  1. Attempting to match glob patterns to deps in package.json
 *
 * @param  {Array|String} `patterns`
 * @param  {Object} `options`
 * @return {Array}
 */

var resolveDep = function (patterns, options) {
  var locals = resolveDep.local(patterns, options);
  var npm = resolveDep.npm(patterns, options);
  return locals.concat(npm);
};



/**
 * ## .npm
 *
 * Resolve npm packages in node_modules by matching glob patterns
 * to deps in package.json.
 *
 * @param  {Array|String} `patterns`
 * @param  {Object} `options`
 * @return {Array}
 */

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
  var modules = _.flatten(_.map(types, function (type) {
    return _.keys(configObj[type]);
  }));

  var matches = multimatch(modules, patterns, options);
  if (matches.length) {
    _.each(matches, function (match) {
      deps = deps.concat(resolve.sync(match, {
        basedir: cwd()
      }));
    });
  }
  return deps.map(normalizeSlash);
};



/**
 * ## .local
 *
 * Resolve local modules by expanding glob patterns to file paths.
 *
 * @param  {Array|String} `patterns`
 * @param  {Object} `options`
 * @return {Array}
 */

resolveDep.local = function (patterns, options) {
  options = options || {};
  options.cwd = options.cwd || cwd();
  options.srcBase = options.cwd;
  options.prefixBase = true;

  var deps = [];

  // find local matches
  var matches = glob.sync(patterns, options).map(pathResolve);
  if (matches.length) {
    _.each(matches, function (match) {
      try {
        try {
          deps = deps.concat(resolve.sync(match, {
            basedir: options.cwd
          }));
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
  return resolveDep.npm(patterns, _.extend({
    type: 'dependencies'
  }, options));
};

resolveDep.dev = function (patterns, options) {
  return resolveDep.npm(patterns, _.extend({
    type: 'devDependencies'
  }, options));
};

resolveDep.peer = function (patterns, options) {
  return resolveDep.npm(patterns, _.extend({
    type: 'peerDependencies'
  }, options));
};

module.exports = resolveDep;