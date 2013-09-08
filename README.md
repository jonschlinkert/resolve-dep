# load-modules [![NPM version](https://badge.fury.io/js/load-modules.png)](http://badge.fury.io/js/load-modules)

> Use [matchdep](/tkellen/node-matchdep) to filter and resolve filepaths to npm module dependencies

Use returned filepaths in your node projects (`var load = require('load-modules').load('*')`), or load into your project's Grunt config data with [templates](http://gruntjs.com/api/grunt.template) (`<%= _.load("foo*" %>`).


## Getting started

Install the module with: `npm install load-modules --save`

```js
var load = require('load-modules').load(pattern, config);
console.log(load);
```


## Examples

```js
// Resolve filepaths to all dependencies from package.json
require('load-modules').load('foo*');

// Resolve filepaths to all devDependencies
require('load-modules').loadDev('bar-*');

// Resolve filepaths to both dependencies and devDependencies
require('load-modules').loadAll('*-baz'));

// Resolve the path to a specific module
require('load-modules').filepath('module-to-resolve');
```

[More examples →](EXAMPLES.md)

### Lo-dash templates

First, mixin this module's methods so they can be used in Lo-Dash templates:

```js
module.exports = function (grunt) {
  // start by adding this line of JavaScript to your Gruntfile
  grunt.util._.mixin(require('load-modules'));

  grunt.initConfig({...});
  grunt.registerTask(...);
};
```

with the mixins defined, you can use them in templates like this:

```js
grunt.initConfig({
  less: {
    src: ['<%= _.load("normalize.css") %>', '<%= foo.bar %>', 'theme.less'],
    dest: 'dist/'
  }
});
```
Any specified template strings (`<%= %>`) will be processed when config data is retrieved.

[More examples →](EXAMPLES.md)


## Usage

```js
// Resolve filepaths for dependencies
load(pattern, config)
// Resolve filepaths for devDependencies
loadDev(pattern, config)
// Resolve filepaths for all dependencies
loadAll(pattern, config)
// Resolve filepath for a specific module
filepath(pattern, config)
```


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.


## Related projects

+ [assemble/assemble](https://assemble.io)
+ [assemble/handlebars-helpers](/assemble/handlebars-helpers)
+ [assemble/assemble-less](/assemble/assemble-less)


## Author

**Jon Schlinkert**

+ [http://github.com/jonschlinkert](/jonschlinkert)
+ [http://twitter.com/jonschlinkert](http://twitter.com/jonschlinkert)


## Release History
* 2013-09-07    v0.1.0    First commit.


## License
Copyright (c) 2013 Jon Schlinkert, contributors.
Licensed under the MIT license.
