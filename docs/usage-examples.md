```js
// Resolve filepaths to all dependencies from package.json
require('resolve-dep').filter('*');

// Resolve filepaths to all devDependencies
require('resolve-dep').filterDev('*');

// Resolve filepaths to both dependencies and devDependencies
require('resolve-dep').filterAll('*'));
```