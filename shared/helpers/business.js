const parseVariations = (object) => object.reduce(
  (a1, { name, value }) => ({
    ...a1,

    [name]: {
      type: 'checkbox',
      label: name,
      required: true,

      values: value
        .split(',')
        .map((option) => option.trim())
        .reduce(
          (a2, option) => ({
            ...a2,
            [option]: option,
          }),
          {},
        ),
    },
  }),
  {},
);

export { parseVariations };
