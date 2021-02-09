import { mutations, actions, getters } from './_shared/index';

const sharedModule = (service, params = { ttl: 0 }) => ({
  namespaced: true,
  state: {
    item: {},
    items: [],

    filtered: [],
    error: {},
    info: {},
    loading: false,
  },
  mutations,
  actions: actions(service, params),
  getters,
});

export default sharedModule;
