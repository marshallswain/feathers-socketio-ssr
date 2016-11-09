const feathers = require('feathers');
const socketio = require('feathers-socketio');
const rest = require('feathers-rest');

const app = feathers()
  .configure(rest())
  .configure(socketio());

module.exports = function () {
  return new Promise(resolve => {
    app.on('ready', resolve(app));
  });
};

app.listen(8999, error => {
  if (error) {
    throw new Error(error);
  }
  app.emit('ready', true);
});
