import pagseguroService from 'client/services/pagseguroService';

const pagseguro = {
  namespaced: true,
  state: {
    error: undefined,
    checkoutCode: undefined,
  },
  mutations: {
    LINK_GENERATE(state, data) {
      state.checkoutCode = data.code;
    },
  },
  actions: {
    generateLink({ commit }, payload) {
      return pagseguroService
        .generateLink(payload)
        .then((response) => commit('LINK_GENERATE', response.data));
    },
  },
  getters: {
    checkoutCode: (state) => state.checkoutCode,
  },
};

export default pagseguro;
