# load-modules [![NPM version](https://badge.fury.io/js/load-modules.png)](http://badge.fury.io/js/load-modules)

> Load the resolved paths to npm modules, either directly or in your project's Grunt config using Underscore/Lo-Dash templates.

Depends on [matchdep](/tkellen/node-matchdep) by [@tkellen](/tkellen).

Install the module with: `npm install load-modules --save`

```js
var load = require('load-modules').load(pattern, config);
console.log(load);
```



## Usage

```js
// Resolve paths to all dependencies from package.json
require('load-modules').load('foo*');

// Resolve paths to all devDependencies
require('load-modules').loadDev('bar-*');

// Resolve paths to both dependencies and devDependencies
require('load-modules').loadAll('*-baz'));

// Resolve the path to a specific module
require('load-modules').filepath('module-to-resolve');
```

### Examples

Based on the dependencies of this project, the following:

```js
console.log(require('load-modules').load('*'));
```

returns:

```json
[
  "node_modules/lodash/dist/lodash.js",
  "node_modules/matchdep/lib/matchdep.js",
  "node_modules/minimatch/minimatch.js",
  "node_modules/chalk/chalk.js"
]
```

Resolve the path to a specific npm module:

```js
console.log(require('load-modules').filepath('lodash'));
```

returns:

```json
node_modules/lodash/dist/lodash.js
```

### Custom config

```js
// Load devDependencies (with config string indicating file to be required)
require('load-modules').load('*', './package.json');

// Load all dependencies (with explicit config provided)
require('load-modules').load('*', require('./package.json'));
```


## Underscore/Lo-Dash Mixins and Templates

To mixin the methods from _load-modules_:

```js
module.exports = function (grunt) {
  // Use as a mixin with lodash templates, so that resolved npm modules
  // are loaded directly into src file patterns in Grunt tasks
  grunt.util._.mixin(require('load-modules'));

  grunt.initConfig({
    foo: {
      // Load resolved paths to dependencies
      src: ['<%= _.load("*") %>'],
      // => node_modules/lodash/dist/lodash.js, node_modules/matchdep/lib/matchdep.js
      dest: 'dist/'
    },

    // assemble-less grunt plugin
    less: {
      src: ['<%= _.load("normalize.css") %>', 'theme.less'],
      dest: 'dist/'
    },

    assemble: {
      options: {
        helpers: ['<%= _.load("my-helpers-*") %>'],
        partials: ['<%= _.load("my-partials-*") %>'],
        data: ['<%= _.load("my-data-*") %>']
      },
      site: {
        src: ['src/*.hbs'],
        dest: 'dist/'
      }
    }
  });
  grunt.registerTask('default', ['foo', 'less']);
};
```

### Customize the mixin names

```js
module.exports = function (grunt) {

  grunt.util._.mixin({
    foo: function(pattern, config) {
      return require('load-modules').load(pattern, config);
    },
    bar: function(config) {
      return require('load-modules').loadDev('pattern', config);
    },
    baz: function(pattern, config) {
      return require('load-modules').loadAll(pattern, config);
    }
  });

  grunt.initConfig({
    foo: {
      src: ['<%= _.baz("my-module-*") %>'],
      dest: 'dist/'
    }
  });
  grunt.registerTask(...);
};
```



## parameters

```js
// Resolve paths for dependencies
load(pattern, config)
// Resolve paths for devDependencies
loadDev(pattern, config)
// Resolve paths for all dependencies
loadAll(pattern, config)
// Resolve path for a specific module
filepath(pattern, config)
```

### pattern
Type: `String`
Default: none

[minimatch](/isaacs/minimatch) compatible pattern to filter dependencies.

### config
Type: `String` or `Object`
Default: `path.resolve(process.cwd(),'package.json')`

If config is a string, [matchdep](/tkellen/node-matchdep) will attempt to require it. If it is an object, it will be used directly.




## Author

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## Release History

* 2013-09-07    v0.1.0    First commit.

## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Licensed under the MIT license.
