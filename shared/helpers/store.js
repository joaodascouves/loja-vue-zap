export const retrieveFromSSR = (getter, payload) => {
  if (window.INITIAL_DATA && window.INITIAL_DATA[getter]) {
    const target = window.INITIAL_DATA[getter];

    /* does payload matches current object? */
    const matches = Object.entries(payload).reduce(
      (a, [key, value]) => a && target[key] === value,
      true,
    );

    /* if it does, then return current object */
    if (matches) {
      return target;
    }
  }
};
