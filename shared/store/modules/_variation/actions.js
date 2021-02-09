export default {
  addVariation({ commit }) {
    commit('VARIATION_ADD');
  },
  removeVariation({ commit }, index) {
    commit('VARIATION_REMOVE', index);
  },
  selectVariation({ commit }, payload) {
    commit('VARIATION_SELECT', payload);
  },
};
