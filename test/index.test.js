const expect = require('chai').expect;
const feathers = require('feathers/client');
const socketio = require('../src');
const isCommonSSR = require('../src/is-common-ssr');
const io = require('socket.io-client');
const prepareServer = require('./server');

global.window = {
  doneSsr: true
};

describe('feathers-socketio-ssr', () => {
  it('is CommonJS compatible', () => {
    expect(typeof require('../lib')).to.equal('function');
  });

  it('DoneSSR environment emulated correctly', () => {
    return prepareServer().then(server => {
      expect(typeof isCommonSSR).to.equal('function');
      expect(isCommonSSR()).to.equal(true);

      global.window.doneSsr = false;
      expect(isCommonSSR()).to.equal(false);
    });
  });

  it('Sets up rest provider in SSR environment', () => {
    return prepareServer().then(server => {
      global.window.doneSsr = true;

      const url = 'http://localhost:8999';
      const socket = io(url);
      const feathersClient = feathers()
        .configure(socketio(socket));

      expect(typeof feathersClient.rest).to.equal('function', 'Rest provider was setup correctly');
      expect(feathersClient.io).to.equal(undefined, 'socketio provider was not setup');
    });
  });

  it('Sets up socketio provider outside of SSR environment', () => {
    return prepareServer().then(server => {
      global.window.doneSsr = false;

      const url = 'http://localhost:8999';
      const socket = io(url);
      const feathersClient = feathers()
        .configure(socketio(socket));

      expect(feathersClient.rest).to.equal(undefined, 'Rest provider was not setup');
      expect(feathersClient.io.io.uri).to.equal(url, 'socketio provider was setup correctly');
    });
  });

  it('Can use an alternate isSSR function', () => {
    return prepareServer().then(server => {
      global.window.doneSsr = false;

      const isSsr = () => true;
      const url = 'http://localhost:8999';
      const socket = io(url);
      const feathersClient = feathers()
        .configure(socketio(socket, isSsr()));

      expect(typeof feathersClient.rest).to.equal('function', 'Rest provider was setup correctly');
      expect(feathersClient.io).to.equal(undefined, 'socketio provider was not setup');
    });
  });

  it('Can accept an alternate provider as third argument', () => {
    return prepareServer().then(server => {
      global.window.doneSsr = true;

      const url = 'http://localhost:8999';
      const socket = io(url);
      const feathersClient = feathers();
      feathersClient.configure(socketio(socket, null, () => {
        feathersClient.customProvider = true;
      }));

      expect(feathersClient.rest).to.equal(undefined, 'Rest provider was not setup');
      expect(feathersClient.io).to.equal(undefined, 'socketio provider was not setup');
      expect(feathersClient.customProvider).to.equal(true, 'custom provider was setup');
    });
  });
});
