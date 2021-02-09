export default {
  addPaymentMethod({ commit }) {
    commit('PAYMENT_METHOD_ADD');
  },
  removePaymentMethod({ commit }, index) {
    commit('PAYMENT_METHOD_REMOVE', index);
  },
};
