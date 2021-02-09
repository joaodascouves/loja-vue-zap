const isNumber = (value) => !isNaN(value) && value !== null;

/**
 * Helper function used by _setNestedPropertyValue().
 * @param {Object} object
 * @param {Array} param1
 * @param {*} value
 * @returns {Object}
 */
const _setPath = (object, [first, ...rest], value) => {
  if (rest.length === 0) {
    return { ...object, [first]: value };
  }

  const nestedObject = object[first] || {};
  return {
    ...object,
    [first]:
      typeof nestedObject === 'object'
        ? _setPath(nestedObject, rest, value)
        : nestedObject,
  };
};

/**
 * Helper function used by deflattenObject().
 * Sets dynamic nested property on `object`.
 * @param {Object} object
 * @param {String} key
 * @param {*} value
 * @returns {Object}
 */
const _setNestedPropertyValue = (object, key, value) => {
  const path = key.match(/((\.{2,})?[^\.]+)/g);
  return _setPath(object, path, value);
};

/**
 * Helper function used by _serializeArrays().
 * Tells wether `object` is an Array or not.
 * @param {Object} object
 * @returns {Boolean}
 */
const _isArray = (object) => Object.keys(object).reduce((a, b) => a && !isNaN(b), true);

/**
 * Helper function used by deflattenObject().
 * Converts an object with sorted properties into an actual Array recursivelly.
 * @param {Object} object
 */
const _serializeArrays = (object) => !!object
  && Object.entries(object).reduce((a, [key, value]) => {
    if (typeof value === 'object' && !!value) {
      return {
        ...a,
        [key]: !_isArray(value)
          ? _serializeArrays(value)
          : Object.values(value).map((elem) => (typeof elem === 'object' ? _serializeArrays(elem) : elem)),
      };
    }

    return { ...a, [key]: value };
  }, {});

/* eslint-disable no-await-in-loop */

/**
 * Executes async callback for each property on `object`.
 * If callback returns a Promise, then wait for each dispatch to be fullfied.
 * Warning: may be compromising performance.
 * @param {Object} object
 * @param {Function} callback
 */
const iterateObject = async (object, callback) => {
  if (Array.isArray(object)) {
    for (const value of object) {
      await iterateObject(value, callback);
    }

    return;
  }

  const dispatched = [];

  for (const [key, value] of Object.entries(object)) {
    if (!value) {
      continue;
    }

    switch (typeof value) {
    case 'object': {
      await iterateObject(value, callback);
      break;
    }
    default: {
      dispatched.push(await callback(key, value));
      break;
    }
    }
  }

  await Promise.all(dispatched);
};

/**
 * Tells wether `object1` and `object2` are the same.
 * @param {Object} object1
 * @param {Object} object2
 * @returns {Boolean}
 */
const compareObjects = (object1, object2) => Object.entries(object1).reduce((a, [key, value]) => {
  if (Array.isArray(object2)) {
    return a + object2.reduce((a, c) => a + compareObjects(c, value), 0);
  }

  return (
    a
      + (typeof value === 'object'
        ? compareObjects(value, object2[key])
        : object2[key] === value)
  );
}, 0) > 0;

/**
 * Extracts first property of `object`.
 * This function is only meant to be used by store actions
 * and shall be removed in future.
 * @param {Object} object
 * @returns {Object}
 */
const getResult = (object) => {
  const [result] = Object.entries(object).filter(
    (entry) => entry[0] !== '_message',
  );
  return result[1];
};

/**
 * Converts a nested object into a flatten one.
 * Separator is hard-coded and must be replaced also in
 * _setNestedProperty() helper. Used only in formModel component.
 * @param {Object} object
 * @param {Object} parent
 * @param {Object} result
 * @returns {Object}
 */
const flattenObject = (object, parent, result = {}) => {
  Object.entries(object).forEach(([key, value]) => {
    const propName = parent ? `${parent}.${key}` : key;

    if (
      value
      && typeof value === 'object'
      && Object.keys(value).length > 0
      && !Array.isArray(value)
      && value.type === undefined
    ) {
      flattenObject(value, propName, result);
    } else {
      result[propName] = value;
    }
  });

  return result;
};

/**
 * Converts a flatten object back into a normal one.
 * Used only in formModel component.
 * @param {Object} object
 * @returns {Object}
 */
const deflattenObject = (object) => {
  let result = {};

  Object.entries(object).forEach(([key, value]) => {
    result = /\w\./.test(key)
      ? _setNestedPropertyValue(result, key, value)
      : { ...result, [key]: value };
  });

  return _serializeArrays(result);
};

export {
  isNumber,
  getResult,
  iterateObject,
  compareObjects,
  flattenObject,
  deflattenObject,
};
