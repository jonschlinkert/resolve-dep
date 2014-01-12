# resolve-dep [![NPM version](https://badge.fury.io/js/resolve-dep.png)](http://badge.fury.io/js/resolve-dep)

> Return an array of resolved filepaths for named npm module dependencies. Wildcard (glob) patterns can be used.

**BREAKING CHANGES IN 0.2.0**: Please read the [Release History](#release-history)!

Use in node projects (`var load = require('resolve-dep').filter('*')`), or filter directly into your project's Grunt config data using [templates](http://gruntjs.com/api/grunt.template) (`<%= _.load("foo") %>`).

## Getting started
{%= _.doc('getting-started.md') %}

## API
{%= _.doc('api.md') %}

## Usage examples
{%= _.doc('usage-examples.md') %}

## Interface changes!

As of v0.2.0, the following methods have been renamed (left = old, right = new):

* **~~resolve.dep~~** / **~~resolve.load~~**: => `resolve.filter`
* **~~resolve.dev~~** / **~~resolve.loadDev~~**: => `resolve.filterDev`
* **~~resolve.all~~** / **~~resolve.loadAll~~**: => `resolve.filterAll`
* **~~resolve.depDirname~~**: => `resolve.dirname`
* **~~resolve.devDirname~~**: => `resolve.dirnameDev`
* **~~resolve.allDirname~~**: => `resolve.dirnameAll`

_Aliases are still available but will be removed in 0.3.0._

[More examples →](EXAMPLES.md)

## Contributing
{%= _.contrib('contributing.md') %}

## Related projects

+ [assemble/assemble](https://assemble.io)
+ [assemble/handlebars-helpers](http://gruntjs.com/assemble/handlebars-helpers)
+ [assemble/assemble-less](http://gruntjs.com/assemble/assemble-less)

## Author
{%= _.contrib('authors.md') %}

Also, thank you to [@tkellen](http://github.com/tkellen) for the excellent [matchdep](http://github.com/tkellen/node-matchdep), which is used for filtering dependencies.

## Release History
* 2014-01-07    v0.2.0    Refactored completely.
* 2013-09-07    v0.1.0    First commit.

## License
{%= copyright %}
{%= license %}

***

{%= _.include("footer.md") %}