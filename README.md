# feathers-socketio-ssr

[![Build Status](https://travis-ci.org/feathersjs/feathers-socketio-ssr.png?branch=master)](https://travis-ci.org/feathersjs/feathers-socketio-ssr)
[![Code Climate](https://codeclimate.com/github/feathersjs/feathers-socketio-ssr/badges/gpa.svg)](https://codeclimate.com/github/feathersjs/feathers-socketio-ssr)
[![Test Coverage](https://codeclimate.com/github/feathersjs/feathers-socketio-ssr/badges/coverage.svg)](https://codeclimate.com/github/feathersjs/feathers-socketio-ssr/coverage)
[![Dependency Status](https://img.shields.io/david/feathersjs/feathers-socketio-ssr.svg?style=flat-square)](https://david-dm.org/feathersjs/feathers-socketio-ssr)
[![Download Status](https://img.shields.io/npm/dm/feathers-socketio-ssr.svg?style=flat-square)](https://www.npmjs.com/package/feathers-socketio-ssr)

> Switch feathers-socketio requests to use feathers-rest in a server environment

## Installation

```
npm install feathers-socketio-ssr --save
```

## Documentation

Please refer to the [feathers-socketio-ssr documentation](http://docs.feathersjs.com/ecosystem/feathers-socketio-ssr/) for more details.

## Complete Example

Here's an example of a Feathers client that uses `feathers-socketio-ssr`. 

```js
const feathers = require('feathers/client');
const socketio = require('feathers-socketio-ssr');
const rest = require('feathers-rest/client');
const hooks = require('feathers-hooks/client');
const io = require('socket.io-client');
const sa = require('superagent/browser');

const socket = io('http://localhost:8080');

const feathersClient = feathers()
  .configure(hooks())
  // Use the plugin in a Feathers Client application
  .configure(socketio(socket, null, rest('http://localhost:8080').superagent(sa)));

module.exports = feathersClient;
```

## API

### `socketio(socket, isSsrFn, alternateProvider)`
Automatically switches isomorphic code to use a different provider in a server side rendering environment.

```js
const feathers = require('feathers/client');
const socketio = require('feathers-socketio-ssr');
const rest = require('feathers-rest/client');
const sa = require('superagent/browser');
const io = require('socket.io-client');

const socket = io('http://localhost:8080');
const isCustomEnvironment = function(){
  return true;
}

const feathersClient = feathers()
  // Use the plugin in a Feathers Client application
  .configure(socketio(socket, isCustomEnvironment(), rest('http://localhost:8080').superagent(sa)));

module.exports = feathersClient;
```

1. **socket** `{SocketIO}`: A SocketIO socket.
2. **isSsr** `{Boolean}`: allows use of custom logic to determine if the provider should switch from socketio to the alternateProvider.
3. **alternateProvider** `{FeathersProvider}`: allows for customizing the provider that the SSR server will use.  If not passed, it will use `feathers-rest` configured for jQuery Ajax.  You must install jQuery separately.

## License

Copyright (c) 2016

Licensed under the [MIT license](LICENSE).
