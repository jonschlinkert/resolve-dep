/*!
 * resolve-dep <https://github.com/jonschlinkert/resolve-dep>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var mm = require('micromatch');
var pkg = require('load-pkg');
var cwd = require('cwd');

/**
 * Cache deps keys for repeat lookups
 */

var cache = {};

/**
 * Resolve paths to local modules
 */

function local(patterns, type) {
  // do local stuff
}

/**
 * Resolve paths to npm modules
 */

function npm(patterns, type) {
  switch(type) {
    case 'dev':
      type = 'devDependencies';
      break;
    case 'peer':
      type = 'peerDependencies';
      break;
    default:
      type = 'dependencies';
      break;
  }
  return paths(patterns, type);
}
console.log(npm('*', 'dev'))

/**
 * Returns resolved paths to local npm modules that
 * match the given patterns.
 *
 * @param  {String|Array} `globs`
 * @param  {String} `type`
 * @return {Array}
 */

function paths(globs, type) {
  var isMatch = mm.matcher(globs);
  var arr = keys(type);
  var len = arr.length;
  var res = [];

  while (len--) {
    var key = arr[len];
    if (!isMatch(key)) {
      continue;
    }
    res.push(join(key));
  }
  return res;
}

/**
 * get the keys for the given `type` of dependency
 */

function keys(type) {
  return cache[type] || (cache[type] = Object.keys(pkg[type] || {}));
}

/**
 * Resolve the file path to a local module
 */

function join(name) {
  return cwd('node_modules', name, 'package.json');
}
