# load-modules [![NPM version](https://badge.fury.io/js/load-modules.png)](http://badge.fury.io/js/load-modules)

> Load the resolved paths to npm modules, either directly or in your project's Grunt config using Underscore/Lo-Dash templates.

Depends on [matchdep](/tkellen/node-matchdep) by [@tkellen](/tkellen).


## Getting Started
Install the module with: `npm install load-modules --save`

```js
var load = require('load-modules').load(pattern, config);
console.log(load);
```

### pattern
Type: `String`
Default: none

[minimatch](/isaacs/minimatch) compatible pattern to filter dependencies.

### config
Type: `String` or `Object`
Default: `path.resolve(process.cwd(),'package.json')`

If config is a string, [matchdep](/tkellen/node-matchdep) will attempt to require it. If it is an object, it will be used directly.


## Usage examples

```js
var load = require('load-modules');

// Resolve paths to all dependencies from package.json
require('load-modules').load('foo*');

// Resolve paths to all devDependencies
require('load-modules').loadDev('bar-*');

// Resolve paths to both dependencies and devDependencies
require('load-modules').loadAll('*-baz'));

// Resolve the path to a specific module
require('load-modules').filepath('module-to-resolve');
```

Based on the dependencies of this project, the following:

```js
console.log(require('load-modules').load('*'));
```

would return:

```json
[
  "node_modules/lodash/dist/lodash.js",
  "node_modules/matchdep/lib/matchdep.js",
  "node_modules/minimatch/minimatch.js",
  "node_modules/chalk/chalk.js"
]
```

To resolve the path to a specific npm module:

```js
console.log(require('load-modules').filepath('lodash'));
```

would return:

```json
node_modules/lodash/dist/lodash.js
```


### Underscore Mixins and Templates


To mixin the methods from load-modules using default:

```js
grunt.util._.mixin(require('load-modules'));
```


Add the following to your Grunt config:

```js
module.exports = function (grunt) {
  // Use as a mixin with lodash templates, so that resolved npm modules
  // are loaded directly into src file patterns in Grunt tasks
  grunt.util._.mixin(require('load-modules'));

  grunt.initConfig({
    // Load resolved paths to all pkg.dependencies into foo property
    foo: grunt.template.process('<%= _.load("*") %>')
    // results in (using the deps from this repo as an example):
    // node_modules/lodash/dist/lodash.js,
    // node_modules/matchdep/lib/matchdep.js,
    // node_modules/minimatch/minimatch.js,
    // node_modules/chalk/chalk.js
  });
  grunt.registerTask('default', ['assemble']);
};
```


Or customize the mixins or mixin aliases:

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
    // Check your config
    baz: console.log(grunt.template.process('<%= _.baz("*") %>')),
  });
  grunt.registerTask(...);
};
```


```js
module.exports = function (grunt) {

  // Customize the mixin to use in templates
  grunt.util._.mixin({
    resolve: function(pattern, config) {
      return require('load-modules').load(pattern, config);
    }
  });
  console.log(grunt.util._.resolve('*')); // show deps in command line

  grunt.initConfig({
    assemble: {
      options: {
        helpers: ['<%= _.resolve("my-helpers-*") %>'],
        partials: ['<%= _.resolve("my-partials-*") %>'],
        data: ['<%= _.resolve("my-data-*") %>']
      },
      site: {
        src: ['src/*.hbs'],
        dest: 'dist/'
      }
    },

    // assemble-less Grunt plugin
    less: {
      options: {
        imports: {
          reference: ['<%= _.resolve("my-mixins") %>']
        }
      },
      styles: {
        files: {
          'css/styles.css': ['less/*.less']
        }
      }
    }

  });
  grunt.registerTask('default', ['assemble']);
};
```


#### Author

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
