const meta = {
  namespaced: false,
  state: {
    currentModal: undefined,
    isSplashscreen: false,
  },
  mutations: {
    MODAL_CHANGE(state, value) {
      state.currentModal = value;
    },
    SPLASHSCREEN_SHIFT(state, value) {
      state.isSplashscreen = value;
    },
  },
  actions: {
    changeModal({ commit }, value) {
      commit('MODAL_CHANGE', value);
    },
    closeModal({ commit }) {
      commit('MODAL_CHANGE', undefined);
    },
    shiftSplashscreen({ commit }, value) {
      commit('SPLASHSCREEN_SHIFT', value);
    },
  },
  getters: {
    currentModal: (state) => state.currentModal,
    isSplashscreen: (state) => state.isSplashscreen,
  },
};

export default meta;
