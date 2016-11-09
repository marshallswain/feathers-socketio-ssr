module.exports = function isCommonSSR () {
  // TODO: figure out a good default for Non-DoneJS SSR scenarios.
  return window.doneSsr;
};
