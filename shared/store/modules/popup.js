const popup = {
  namespaced: false,
  state: {
    popup: {
      id: '',
      title: undefined,
      message: undefined,
      component: undefined,
    },
    data: {},
    _acceptedId: undefined,
    _acceptedCount: 0,
  },
  mutations: {
    POPUP_CHANGE(state, payload) {
      state.data = {};
      Object.assign(state, payload);
    },
    POPUP_ACCEPT(state) {
      state._acceptedId = state.popup.id;
      state._acceptedCount += 1;
    },
    POPUP_CLOSE(state) {
      state.popup = {};
    },
  },
  actions: {
    changePopup({ commit }, payload) {
      commit('POPUP_CHANGE', payload);
    },
    acceptPopup({ commit }) {
      commit('POPUP_ACCEPT');
    },
    closePopup({ commit }) {
      commit('POPUP_CLOSE');
    },
  },
  getters: {
    currentPopup: (state) => state,
    popupVisible: (state) => state.popup
      && (state.popup.message !== undefined
        || state.popup.component !== undefined),
    popupAccepted: (state) => ({
      id: state._acceptedId,
      iter: state._acceptedCount % 2,
    }),
    popupData: (state) => state.data,
  },
};

export default popup;
