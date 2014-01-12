```js
// Resolve filepaths for dependencies
filter(pattern)

// Resolve filepaths for devDependencies
filterDev(pattern)

// Resolve filepaths for peer dependencies
filterPeer(pattern)

// Resolve filepaths for all dependencies
filterAll(pattern)
```

Resolve dirnames for dependencies:

```js
// Resolve dirname for dependencies
dirname(pattern)

// Resolve dirname for devDependencies
dirnameDev(pattern)

// Resolve dirname for peerDependencies
dirnamePeer(pattern)

// Resolve dirname for both dependencies and devDependencies
dirnameAll(pattern)
// => ['node_modules/foo']
```