# Examples

> Some basic usage examples to help you get started.

Based on the dependencies of this project, the following:

```js
console.log(require('resolve-dep').filterAll('*'));
```
returns:

```json
[
  "node_modules/chalk/index.js",
  "node_modules/findup-sync/lib/findup-sync.js",
  "node_modules/matchdep/lib/matchdep.js",
  "node_modules/resolve/index.js",
  "node_modules/stack-trace/lib/stack-trace.js",
  "node_modules/grunt/lib/grunt.js",

  // These devDependencies don't specify a "main" property
  // in package.json, so resolve-dep resolves to the
  // package.json of the module in the npm directory
  "node_modules/grunt-contrib-jshint/package.json",
  "node_modules/grunt-contrib-nodeunit/package.json"
]
```

### Create Lo-Dash mixins

```js
_.mixin({
  load: function(pattern, config) {
    return require('resolve-dep').filter(pattern, config);
  },
  loadDev: function(config) {
    return require('resolve-dep').filterDev('pattern', config);
  },
  loadAll: function(pattern, config) {
    return require('resolve-dep').filterAll(pattern, config);
  }
});
```
#### Usage:

```js
_.load('*');
```

#### Usage in Lo-Dash templates.

Example usage in Gruntfile config:

```js
plugins: ['<%= _.load("foo") %>', '<%= _.load("bar") %>']
// Might resolve to something like
// ["node_modules/foo/lib/foo.js", "node_modules/bar/index.js"]
```


Have suggestions for improving the examples? Please submit a pull request or [create an issue](http://gruntjs.com/jonschlinkert/resolve-dep/issues) to let me know! Thanks!