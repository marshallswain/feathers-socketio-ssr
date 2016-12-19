const socketio = require('feathers-socketio/client');
const isCommonSSR = require('./is-common-ssr');

module.exports = function init (socket, isSsr, customRest) {
  if (!socket || !socket.io.uri) {
    throw new Error('You must pass an initialized socket to the feathers-socketio-ssr plugin.');
  }
  const isSSR = typeof isSsr === 'boolean' ? isSsr : isCommonSSR();

  return isSSR ? customRest : socketio(socket);
};
