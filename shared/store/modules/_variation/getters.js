export default {
  variations: ({ item }) => item.variations
    && item.variations.map(({ name, value, selected }) => ({
      name,
      value: Array.isArray(value) ? value.join(',') : value,
      selected,
    })),
  pureVariations: ({ item }) => item.variations.map(({ name, value }) => ({
    name,
    value: value.map((v) => String(v).trim()),
  })),
};
