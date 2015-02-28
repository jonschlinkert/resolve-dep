/*!
 * resolve-dep <https://github.com/jonschlinkert/resolve-dep>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var cwd = require('cwd');
var pkg = require('load-pkg');
var mm = require('micromatch');


var types = ['dependencies', 'devDependencies', 'peerDependencies'];
var cache = {files: []};


function npm(patterns, options) {
  options = options || {};
}

/**
 * Resolve the file path to a local module
 */

function dependencies(patterns) {
  return paths(patterns, 'dependencies');
}

/**
 * Resolve the file path to a local module
 */

function devDependencies(patterns) {
  return paths(patterns, 'devDependencies');
}

/**
 * Resolve the file path to a local module
 */

function peerDependencies(patterns) {
  return paths(patterns, 'peerDependencies');
}

console.log(peerDependencies('arr*'));
/**
 * get the keys for a dep type
 */

function listKeys(type) {
  return cache.keys || (cache.keys = Object.keys(pkg[type] || {}));
}

/**
 * Get the file paths for dependency `type`
 */

function paths(globs, type) {
  var isMatch = mm.matcher(globs);
  var keys = listKeys(type);
  var len = keys.length;
  var res = [];

  while (len--) {
    var key = keys[len];
    if (!isMatch(key)) {
      continue;
    }
    res.push(resolve(key));
  }
  return res;
}

/**
 * Resolve the file path to a local module
 */

function resolve(name) {
  return cwd('node_modules', name, 'package.json');
}
