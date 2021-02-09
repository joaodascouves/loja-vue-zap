const toast = {
  namespaced: false,
  state: {
    loading: false,
    errorExists: false,
    error: {},
    infoExists: false,
    info: {},
  },
  mutations: {
    LOADING_SHIFT(state, value) {
      state.loading = value;
    },
    ERROR_SPAWN(state, value) {
      state.errorExists = true;
      state.error = value;
    },
    ERROR_CLEAR(state) {
      state.errorExists = false;
    },
    INFO_SPAWN(state, value) {
      state.infoExists = true;
      state.info = value;
    },
    INFO_CLEAR(state) {
      state.infoExists = false;
    },
  },
  actions: {
    shiftLoading({ commit }, value) {
      commit('LOADING_SHIFT', value);
    },
    spawnError({ commit }, alert) {
      commit('ERROR_SPAWN', alert);
    },
    clearError({ commit }) {
      commit('ERROR_CLEAR');
    },
    spawnInfo({ commit }, alert) {
      commit('INFO_SPAWN', alert);
    },
    clearInfo({ commit }) {
      commit('INFO_CLEAR');
    },
  },
  getters: {
    isLoading: (state) => state.loading,
    errorExists: (state) => state.errorExists,
    error: (state) => (state.error === undefined ? 'undefined' : state.error),
    infoExists: (state) => state.infoExists,
    info: (state) => (state.info === undefined ? 'undefined' : state.info),
  },
};

export default toast;
