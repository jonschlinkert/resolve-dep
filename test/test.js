/**
 * Assemble <http://assemble.io>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors
 * Licensed under the MIT License (MIT).
 */

var path = require('path');
var resolve = require('resolve');
var isAbsolute = require('is-absolute');
var cwd = require('cwd');
require('should');
var resolveDep = require('../');

function normalizeSlash(filepath) {
  return filepath.replace(/\\/g, '/');
}

describe('explicit dependency type', function () {
  describe('when "dependencies" is passed to the `type` option', function () {
    describe('when the module exists', function () {
      it('should return the resolved file path to the module', function () {
        var actual = resolveDep('cwd', {type: 'dependencies'});
        actual.should.eql([resolve.sync('cwd')]);
      });
      it('should return the resolved file path to the module', function () {
        var actual = resolveDep('should', {type: 'devDependencies'});
        actual.should.eql([resolve.sync('should')]);
      });
    });

    describe('when the module does not exist', function () {
      it('should return an empty array', function () {
        resolveDep('should', {type: 'dependencies'}).should.eql([]);
      });
    });
  });
});

describe('named npm dependencies', function () {
  it('should resolve the absolute filepath to the module', function () {
    resolveDep('cwd').should.eql([resolve.sync('cwd')]);
  });
  it('should use glob patterns to resolve the absolute filepath to the module', function () {
    resolveDep('load*').should.eql([resolve.sync('load-pkg')]);
  });
});

describe('when a file path to a local module is passed', function () {
  describe('as a string', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep('index.js');
      isAbsolute(actual[0]).should.be.true;
    });
  });

  describe('as a glob pattern', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep('*.js');
      isAbsolute(actual[0]).should.be.true;
    });
  });

  describe('as a glob pattern', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep('*.json');
      isAbsolute(actual[0]).should.be.true;
    });
  });
});

describe('when a file path to a non-existant local dependency is passed', function () {
  it('should return an empty array', function () {
    var actual = resolveDep('./something/that/does/not/exist.js');
    actual.should.eql([]);
  });
});

describe('when a file path to non-requireable is passed', function () {
  it('should return the resolved path to the file', function () {
    var actual = resolveDep('./README.md');
    actual.length.should.eql(1);
  });
});

describe('when a path to a local module and named npm dependencies are specified together', function () {
  it('should resolve the paths to both', function () {
    var actual = resolveDep(['cwd', './index.js']);
    actual.length.should.eql(2);
  });
});

describe('.local()', function () {
  describe('when a path to a local module is passed)', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep.local('./index.js');
      isAbsolute(actual[0]).should.be.true;
    });
  });

  describe('when a path to a local module is passed)', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep.local(['./index.js', './test/fixtures/bar.js']);
      actual.length.should.eql(2);
    });
  });

  describe('when an array of filepaths to both existing and non-existant local modules is passed)', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep.local(['./index.js', './blah.js']);
      actual.length.should.eql(1);
    });
  });

  describe('when an array of filepaths to both existing and invalid local modules is passed)', function () {
    it('should resolve the filepath', function () {
      var actual = resolveDep.local(['./index.js', './README.md']);
      actual.length.should.eql(2);
    });
  });

  describe('when a file path to a non-existant module is passed', function () {
    it('should return an empty array', function () {
      var actual = resolveDep.local('./something/that/does/not/exist.js');
      actual.should.eql([]);
    });
  });

  describe('when a file path to an invalid module (e.g. non-module) is passed', function () {
    it('shoud return an empty array', function () {
      var actual = resolveDep.local('./README.md');
      actual.length.should.eql(1);
    });
  });
});

describe('.npm()', function () {
  describe('when named npm dependencies are specified as a string', function () {
    it('should return an array of filepaths to resolved npm modules', function () {
      var actual = resolveDep.npm('cwd');
      var expected = [resolve.sync('cwd')];
      actual.should.eql(expected);
    });
  });

  describe('when named dependencies are specified as a glob pattern', function () {
    it('should return an array of filepaths to resolved npm modules', function () {
      var actual = resolveDep.npm(['cwd']);
      var expected = [resolve.sync('cwd')];
      actual.should.eql(expected);
    });
  });

  describe('when a path to a local module is passed to resolveDep.npm()', function () {
    it('should return an empty array when nothing is found', function () {
      var actual = resolveDep.npm('./index.js');
      actual.should.eql([]);
    });

    it('should return an array of all resolved modules', function () {
      var fp = path.resolve('node_modules/cwd/index.js');
      resolveDep.npm('c*').should.eql([fp]);
    });

    it('should use negation patterns', function () {
      var fp = path.resolve('node_modules/should/lib/should.js');
      resolveDep.npm(['*', '![a-r]*']).should.eql([fp]);
    });
  });
});

describe('explicit config', function () {
  describe('when named, non-existant npm dependencies are specified as a string', function () {
    it('should return an empty array', function () {
      var foo = require('./fixtures/foo.json');
      var actual = resolveDep.npm('cwd', {config: foo});
      actual.should.eql([]);
    });
  });
  describe('when named npm dependencies are specified as a string', function () {
    it('should return an empty array', function () {
      var foo = require('./fixtures/foo.json');
      var actual = resolveDep.npm('globby', {config: foo});
      var expected = [resolve.sync('globby')];
      actual.should.eql(expected);
    });
  });
});