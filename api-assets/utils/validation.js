const validateVariations = async (self) => {
  if (self.variations) {
    self.variations = self.variations.map(({ name, value }) => ({
      name,
      value: !Array.isArray(value) ? value.split(',') : value,
    }));
  }
};

export { validateVariations };
