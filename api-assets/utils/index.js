const parseurl = require('parseurl');

/**
 * Add `name` prefix to `controller` methods.
 * @param {String} name
 * @param {Object} controller
 * @returns {Object}
 */
const childController = (name, controller) => Object.entries(controller).reduce(
  (a, [key, value]) => ({
    ...a,
    [`${name}_${key}`]: value,
  }),
  {},
);

/**
 * Extracts hostname from `url`.
 * @param {String} url
 * @returns {String}
 */
const getDomain = (url) => {
  if (!url) {
    return;
  }

  const { hostname } = parseurl({ url });
  return hostname && hostname.replace(/^www\./, '');
};

module.exports = {
  childController,
  getDomain,
};
