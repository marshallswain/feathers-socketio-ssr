const socketio = require('feathers-socketio/client');
const rest = require('feathers-rest/client');
const isCommonSSR = require('./is-common-ssr');

module.exports = function init (socket, isSsr, customRest) {
  if (!socket || !socket.io.uri) {
    throw new Error('You must pass an initialized socket to the feathers-socketio-ssr plugin.');
  }
  const url = socket.io.uri;
  const isSSR = typeof isSsr === 'boolean' ? isSsr : isCommonSSR();

  return isSSR ? customRest || rest(url).jquery(require('jquery')) : socketio(socket);
};
