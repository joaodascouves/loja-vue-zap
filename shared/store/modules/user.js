import { getResult } from 'shared/helpers';

import userService from 'shared/services/userService';
import storageService from 'shared/services/storageService';
import zipcodeService from 'shared/services/zipcodeService';

import sharedModule from './_shared';
// import router from '../../router';

const module = sharedModule(userService, {});

const emptyUser = {
  location: {
    zipcode: '',
    city: '',
    state: '',
  },
};

const user = {
  ...module,

  state: {
    ...module.state,
    token: undefined,
    currentUser: emptyUser,
    pair: {
      email: undefined,
      password: undefined,
    },

    userExists: false,
  },
  mutations: {
    ...module.mutations,

    ITEM_GET(state, item) {
      state.item = {
        ...item,
        password: '',
        confirmation: '',
      };
    },

    TOKEN_REGISTER(state, { token, user }) {
      state.pair = {};
      state.token = token;
      state.currentUser = {
        ...user,
        confirmation: undefined,
      };

      storageService.save('auth:token', token);
      storageService.save('auth:currentUser', JSON.stringify(user));

      // window.router.push({ path: '/' });
    },

    CURRENT_USER_CHANGE(state, user) {
      state.currentUser = user;
    },

    USER_EXISTS_SET(state, value) {
      state.userExists = value;
    },

    USER_PAIR_SET(state, payload) {
      state.pair = payload;
    },

    ZIPCODE_FETCH(state, payload) {
      const {
        zipcode,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
      } = payload;

      Object.assign(state.currentUser, {
        location: {
          zipcode,
          state: uf,
          city: localidade,
          district: bairro,
          street: logradouro,
          complement: complemento,
        },
      });
    },
  },
  actions: {
    ...module.actions,

    userExists({ commit, dispatch }, payload) {
      dispatch('shiftLoading', true);

      return new Promise((_resolve, _reject) => userService
        .post('exists', payload)
        .then(
          ({ data: { result } }) => {
            const resolve = () => {
              commit('USER_EXISTS_SET', true);
              return _resolve();
            };

            const reject = () => {
              commit('USER_EXISTS_SET', false);
              return _reject();
            };

            return result === true ? resolve() : reject();
          },
          (error) => {
            dispatch('spawnError', {
              message: error,
              ref: payload,
            });

            reject(error);
          },
        )
        .finally(() => {
          dispatch('shiftLoading', false);
        }));
    },

    clearUserExists({ commit }) {
      commit('USER_EXISTS_SET', false);
    },

    setPair({ commit }, payload) {
      commit('USER_PAIR_SET', payload);
    },

    auth({ commit, dispatch }, payload) {
      dispatch('shiftLoading', true);

      return new Promise((resolve, reject) => userService
        .post('auth', payload)
        .then(
          ({ data }) => {
            if (data._message) {
              dispatch('spawnInfo', {
                message: data._message,
              });
            }

            const result = getResult(data);

            if (payload.admin && payload.admin === true) {
              if (result.user.role !== 'admin') {
                dispatch('spawnError', {
                  message: 'Usuário sem privilégio',
                });

                return reject(error);
              }
            }

            commit('TOKEN_REGISTER', result);
            resolve(result);
          },
          (error) => {
            dispatch('spawnError', {
              message: error,
            });

            reject(error);
          },
        )
        .finally(() => {
          dispatch('shiftLoading', false);
        }));
    },

    logout({ commit }) {
      return commit('TOKEN_REGISTER', {
        token: undefined,
        user: emptyUser,
      });
    },

    fetchZipcode({ commit, dispatch }, zipcode) {
      dispatch('shiftLoading', true);

      return new Promise((resolve, reject) => zipcodeService
        .fetch(zipcode)
        .then(
          (response) => {
            commit('ZIPCODE_FETCH', { zipcode, ...response });
            resolve(response);
          },
          (error) => {
            reject(error);
          },
        )
        .finally(() => {
          dispatch('shiftLoading', false);
        }));
    },
  },
  getters: {
    ...module.getters,

    token: (state) => state.token,
    pair: (state) => state.pair,
    currentUser: (state) => {
      if (Object.keys(state.currentUser).length > 1) {
        return state.currentUser;
      }

      /* eslint-disable */
      const storedUser = JSON.parse(
        storageService.get("auth:currentUser") || "{}");
      /* eslint-enable */

      let user = state.currentUser;

      if (Object.keys(storedUser).length > 0) {
        user = storedUser;
        user = {
          ...user,
          location: {
            ...user.location,
            ...Object.entries(state.currentUser.location)
              .filter(([key, value]) => !!value)
              .reduce((a, [key, value]) => ({ ...a, [key]: value }), {}),
          },
        };
      }

      return user;
    },

    zipcode: ({
      currentUser: {
        location: { zipcode, city },
      },
    }) => `${zipcode}${city}`,
    userExists: (state) => state.userExists,
  },
};

export default user;
