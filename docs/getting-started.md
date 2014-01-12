Install with [npm](http://nodejs.org/): `npm i resolve-dep --save`

```js
var resolve = require('resolve-dep');
resolve.filter('grunt');
// => ['node_modules/grunt/lib/grunt.js']

resolve.dirname('grunt');
// => ['node_modules/grunt']
```