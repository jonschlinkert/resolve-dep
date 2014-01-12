/**
 * resolve-dep
 * https://github.com/jonschlinkert/resolve-dep
 *
 * Copyright (c) 2013 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

// Node.js
var path = require('path');

// node_modules
var cwd = require('cwd');
var res = require('resolve');
var matchdep = require('matchdep');
var findup = require('findup-sync');

// The module to export
var resolve = module.exports = {};

// Default config obj
var config = require(path.join(cwd, 'package.json'));


// Normalize paths to use `/`
var pathSepRegex = /[\/\\]/g;
var normalizeSlash = function(str) {
  return str.replace(pathSepRegex, '/');
};

var fallback = function(pattern) {
  var filepath = path.join(cwd, 'node_modules', pattern, 'package.json');
  return normalizeSlash(path.relative(cwd, filepath));
};

// Resolve path to a specific file
var resolvePath = function (filepath) {
  return normalizeSlash(path.relative(cwd, res.sync(filepath, {basedir: cwd})));
};


/**
 * Resolve dependencies
 * @example
 *   resolve.dep('assemble'); => ['node_modules/assemble/index.js']
 */


// Resolve paths to dependencies
resolve.filter = function (patterns) {
  return matchdep.filter(patterns, config).map(function (pattern) {
    try {
      return resolvePath(pattern);
    } catch(err) {
      return fallback(pattern);
    }
  });
};

// Resolve paths to devDependencies
resolve.filterDev = function (patterns) {
  return matchdep.filterDev(patterns, config).map(function (pattern) {
    try {
      return resolvePath(pattern);
    } catch(err) {
      return fallback(pattern);
    }
  });
};

// Resolve paths to devDependencies
resolve.filterPeer = function (patterns) {
  return matchdep.filterPeer(patterns, config).map(function (pattern) {
    try {
      return resolvePath(pattern);
    } catch(err) {
      return fallback(pattern);
    }
  });
};

// Resolve paths to dep, dev and peer dependencies
resolve.filterAll = function (patterns) {
  return matchdep.filterAll(patterns, config).map(function (pattern) {
    try {
      return resolvePath(pattern);
    } catch(err) {
      return fallback(pattern);
    }
  });
};


/**
 * Resolve dirnames for dependencies
 * @example
 *   resolve.depDirname('assemble'); => ['node_modules/assemble']
 */

function resolveDirname(name) {
  name = findup('package.json', {cwd: name});
  var relativePath = path.dirname(path.relative(cwd, name));
  return normalizeSlash(relativePath);
}


// Resolve dirname for dependencies
resolve.dirname = function (patterns) {
  return resolve.filter(patterns).map(function (pattern) {
    return resolveDirname(pattern);
  });
};

// Resolve dirname for devDependencies
resolve.dirnameDev = function (patterns) {
  return resolve.filterDev(patterns).map(function (pattern) {
    return resolveDirname(pattern);
  });
};

// Resolve dirname for peerDependencies
resolve.dirnamePeer = function (patterns) {
  return resolve.filterPeer(patterns).map(function (pattern) {
    return resolveDirname(pattern);
  });
};

// Resolve dirname for dep, dev and peer dependencies
resolve.dirnameAll = function (patterns) {
  return resolve.filterAll(patterns).map(function (pattern) {
    return resolveDirname(pattern);
  });
};

// dependencies
resolve.dep        = resolve.filter;
resolve.load       = resolve.filter;

// devDependencies
resolve.dev        = resolve.filterDev;
resolve.loadDev    = resolve.filterDev;

// All dependencies
resolve.all        = resolve.filterAll;
resolve.loadAll    = resolve.filterAll;

// dependency dirnames
resolve.depDirname = resolve.dirname;
resolve.devDirname = resolve.dirnameDev;
resolve.allDirname = resolve.dirnameAll;