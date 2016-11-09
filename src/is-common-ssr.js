module.exports = function isCommonSSR () {
  // TODO: figure out a good default for most common SSR scenario.
  return window.doneSsr;
};
