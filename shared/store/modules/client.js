import { retrieveFromSSR } from 'shared/helpers/store';

import clientService from 'shared/services/clientService';
import storageService from 'shared/services/storageService';

import { modulesConfig } from 'config/business.prod.env';

import { mutations, actions } from './_shared/index';

import * as variations from './_variation';
import * as shipment from './_shipment';
import * as payment from './_payment';

const ttl = modulesConfig.client
  ? modulesConfig.client.ttl
  : 1000 * 60 * 60 * 24 * 3;

const _actions = actions(clientService, {});

const {
  LOADING_SHIFT,
  ERROR_SET,
  ERROR_CLEAR,
  INFO_SET,
  INFO_CLEAR,
} = mutations;

const { shiftLoading, spawnError, spawnInfo } = _actions;

const _save = _actions.save;

const client = {
  namespaced: true,
  state: {
    item: {
      name: undefined,
      phone: undefined,
      email: undefined,
      domains: [],
      logo: undefined,
      instagram: undefined,

      variations: [],
      shipmentServices: [],
      paymentMethods: [],
    },
    stats: {},
  },
  mutations: {
    ...variations.mutations,
    ...shipment.mutations,
    ...payment.mutations,

    LOADING_SHIFT,
    ERROR_SET,
    ERROR_CLEAR,
    INFO_SET,
    INFO_CLEAR,

    ITEM_SAVE(state, configuration) {
      Object.entries(configuration).forEach(([key, value]) => {
        state.item[key] = value;
      });
    },

    STATS_GET(state, stats) {
      state.stats = stats;
    },
  },
  actions: {
    ...variations.actions,
    ...shipment.actions,
    ...payment.actions,

    shiftLoading,
    spawnError,
    spawnInfo,

    get({ commit }) {
      return new Promise((_resolve, reject) => {
        const resolve = (payload) => {
          if (payload && payload._id) {
            storageService.save(
              'client',
              JSON.stringify({
                configuration: payload,
                createdAt: new Date().getTime(),
              }),
            );

            storageService.save('clientId', payload._id);

            window._business = payload;
            window._businessName = payload.name;

            const event = new CustomEvent('clientLoaded', {
              detail: {
                ...payload,
              },
            });

            commit('ITEM_SAVE', payload);
            document.dispatchEvent(event);
          } else {
            return reject('Cliente inválido');
          }

          _resolve(payload);
        };

        // if (window._client && window._client._id) {
        //   console.log('loaded from ssr');
        //   return resolve(window._client);
        // }

        const client = retrieveFromSSR('client/business', {});

        if (client) {
          console.log('loaded from ssr');
          return resolve(client);
        }

        const cachedConfig = JSON.parse(storageService.get('client'));

        if (cachedConfig && cachedConfig.configuration) {
          const { configuration, createdAt } = cachedConfig;
          const now = new Date().getTime();

          if (now - createdAt < ttl) {
            // eslint-disable-next-line no-console
            console.log('configuration loaded from cache');
            return resolve(configuration);
          }
          // eslint-disable-next-line no-console
          console.log(`configuration expired after ${ttl}ms`);
          storageService.remove('clientId');
        }

        clientService.get(`client_get?${new Date().getTime()}`).then(
          ({ data: { result } }) => {
            if (!result || !result._id) {
              return reject(new Error('Invalid configuration'));
            }

            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
      });
    },

    save(store, payload) {
      return new Promise((resolve, reject) => {
        _save(store, { ...payload, _route: 'client_save' }).then(
          (result) => {
            storageService.save(
              'client',
              JSON.stringify({
                configuration: result,
                createdAt: new Date().getTime(),
              }),
            );

            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
      });
    },

    getStats({ commit, dispatch }) {
      dispatch('shiftLoading', true);

      return new Promise((resolve, reject) => {
        clientService
          .get('client_stats')
          .then(
            ({ data: { result } }) => {
              commit('STATS_GET', result);
              resolve();
            },
            (error) => {
              reject(error);
            },
          )
          .finally(() => {
            dispatch('shiftLoading', false);
          });
      });
    },
  },
  getters: {
    ...variations.getters,
    ...shipment.getters,
    ...payment.getters,

    business: ({ item }) => ({
      ...item,
    }),

    stats: ({ stats }) => stats,
  },
};

export default client;
