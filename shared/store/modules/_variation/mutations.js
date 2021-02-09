export default {
  VARIATION_ADD(state) {
    state.item.variations.push({
      name: '',
      value: '',
    });
  },
  VARIATION_REMOVE(state, index) {
    state.item.variations.splice(index, 1);
  },
  VARIATION_SELECT(state, { name, value }) {
    state.item.variations = state.item.variations.map((variation) => ({
      ...variation,
      ...(variation.name === name ? { selected: value } : {}),
    }));
  },
};
