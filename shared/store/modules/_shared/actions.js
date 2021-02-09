import StoreSingleton from 'shared/idb/singleton';

import { getResult } from 'shared/helpers';
import { retrieveFromSSR } from 'shared/helpers/store';
import { modulesConfig } from 'config/business.prod.env';

const offlineStorage = new StoreSingleton();

export default (service, params) => ({
  /**
   * Prefetchs module from cache, otherwise fallback to request.
   * @param {Object} store
   * @param {Object} initParams
   * @returns {Promise}
   */
  async init({ commit, dispatch }, initParams = {}) {
    const { name } = params;
    const { noCache } = initParams;

    const ttl = modulesConfig[name] ? modulesConfig[name].ttl : undefined;

    let isCached = false;
    let items = [];

    if (
      name !== undefined
      && window._isStoreCacheable === true
      && sessionStorage.getItem('noIdb') !== 'true'
      && !noCache
    ) {
      await offlineStorage.switchObjectStore('snapshots');
      const snapshot = await offlineStorage.get(name);

      if (snapshot && snapshot.state) {
        const { createdAt, state } = snapshot;

        if (
          ttl === 0
          || ttl === undefined
          || new Date().getTime() - createdAt < ttl
        ) {
          commit('ITEMS_GET', {
            isCached: true,
            items: state,
          });

          items = state;
          isCached = true;
        } else if (ttl && ttl > 0) {
          // eslint-disable-next-line no-console
          console.log(`${name} expired after ${ttl}ms`);
        }
      }
    }

    if (items.length === 0) {
      dispatch('shiftLoading', true);

      await service
        .post('getAll')
        .then((response) => {
          items = Object.values(response.data)[0];
          commit('ITEMS_GET', { items, isCached: false });
        })
        .finally(() => {
          dispatch('shiftLoading', false);
        });
    }

    return Promise.resolve({
      name,
      isCached,
    });
  },

  /**
   * Shifts module's particular loading state.
   * @param {Object} store
   * @param {Boolean} value
   * @returns {Promise}
   */
  shiftLoading({ commit, dispatch }, value) {
    dispatch('shiftLoading', value, { root: true });
    commit('LOADING_SHIFT', value);

    if (value) {
      commit('ERROR_CLEAR');
      commit('INFO_SET', {
        message: 'Carregando...',
      });
    } else {
      commit('INFO_CLEAR');
    }
  },

  /**
   * Raises a module's particular error.
   * @param {Object} store
   * @param {Object} value
   */
  spawnError({ commit, dispatch }, value) {
    commit('ERROR_SET', value);
    dispatch('spawnError', value, { root: true });
  },

  /**
   * Raises a module's particular info.
   * @param {Object} store
   * @param {Object} value
   */
  spawnInfo({ commit, dispatch }, value) {
    commit('INFO_SET', value);
    dispatch('spawnInfo', value, { root: true });
  },

  /**
   * Saves a document in database.
   * @param {Object} store
   * @param {Object} payload
   * @returns {Promise}
   */
  save({ commit, dispatch }, payload) {
    const { _route, ...newPayload } = payload || {};

    dispatch('shiftLoading', true);

    return new Promise((resolve, reject) => service
      .post(_route || 'save', newPayload)
      .then(
        ({ data }) => {
          const result = getResult(data);
          commit('ITEM_SAVE', result);

          if (data._message) {
            dispatch('spawnInfo', {
              message: data._message,
              ref: result,
            });
          }

          resolve(result);
        },
        (error) => {
          dispatch('spawnError', {
            message: error,
            ref: newPayload,
          });

          reject(error);
        },
      )
      .finally(() => {
        dispatch('shiftLoading', false);
      }));
  },

  /**
   * Gets a document from database.
   * @param {Object} store
   * @param {Object} payload
   * @returns {Promise}
   */
  get({ commit, dispatch }, payload) {
    const { _route, ...newPayload } = payload || {};

    console.log('retrieving...');
    const item = retrieveFromSSR(`${params.name}/item`, payload);

    if (item) {
      commit('ITEM_GET', item);
      return Promise.resolve(item);
    }

    dispatch('shiftLoading', true);

    return new Promise((resolve, reject) => service
      .post(_route || 'get', newPayload)
      .then(
        ({ data }) => {
          const result = getResult(data);
          commit('ITEM_GET', result);
          resolve(result);
        },
        (error) => {
          dispatch('spawnError', {
            message: error,
            ref: newPayload,
          });

          reject(error);
        },
      )
      .finally(() => {
        dispatch('shiftLoading', false);
      }));
  },

  /**
   * Gets all documents from database matching `payload` filter.
   * @param {Object} store
   * @param {Object} payload
   * @returns {Promise}
   */
  getAll({ commit, dispatch }, payload) {
    const { _route, ...newPayload } = payload || {};

    const items = retrieveFromSSR(`${params.name}/items`, payload);

    if (items) {
      commit('ITEMS_GET', items);
      return Promise.resolve(items);
    }

    dispatch('shiftLoading', true);

    return new Promise((resolve, reject) => service
      .post(_route || 'getAll', newPayload)
      .then(
        ({ data }) => {
          const result = getResult(data);
          commit('ITEMS_GET', { items: result, isCached: false });
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

  /**
   * Removes a document from database.
   * @param {Object} store
   * @param {Object} payload
   * @returns {Promise}
   */
  remove({ commit, dispatch }, payload) {
    const { _route, ...newPayload } = payload || {};

    dispatch('shiftLoading', true);

    return new Promise((resolve, reject) => service
      .post(_route || 'remove', newPayload)
      .then(
        ({ data }) => {
          const result = getResult(data);
          commit('ITEM_REMOVE', result);

          if (data._message) {
            dispatch('spawnInfo', {
              message: data._message,
              ref: result,
            });
          }

          resolve(result);
        },
        (error) => {
          dispatch('spawnError', {
            message: error,
            ref: newPayload,
          });

          reject(error);
        },
      )
      .finally(() => {
        dispatch('shiftLoading', false);
      }));
  },

  /**
   * Removes a document's image from database.
   * @param {Object} store
   * @param {Object} payload
   * @returns {Promise}
   */
  removeImage({ commit, dispatch }, payload) {
    const { _route, ...newPayload } = payload || {};

    dispatch('shiftLoading', true);

    return new Promise((resolve, reject) => service
      .post(_route || 'removeImage', newPayload)
      .then(
        ({ data }) => {
          const result = getResult(data);
          commit('ITEM_SAVE', result);

          if (data._message) {
            dispatch('spawnInfo', {
              message: data._message,
              ref: result,
            });
          }

          resolve(result);
        },
        (error) => {
          dispatch('spawnError', {
            message: error,
            ref: newPayload,
          });
          reject(error);
        },
      )
      .finally(() => {
        dispatch('shiftLoading', false);
      }));
  },

  /**
   * Clears current item.
   * @param {Object} store
   */
  clear({ commit }) {
    commit('ITEM_SAVE', {});
  },

  /**
   * Filter available items.
   * Accessible through 'module/filtered'.
   * @param {Object} store
   * @param {Object} params
   */
  filter({ commit }, params) {
    commit('ITEMS_FILTER', params);
  },

  /**
   * Clears any active filters.
   * @param {Object} store
   */
  clearFilter({ commit }) {
    commit('ITEMS_CLEAR_FILTER');
  },

  /**
   * Sets cached image for item.
   * @param {Object} store
   * @param {Object} params
   */
  setCachedImage({ commit }, params) {
    commit('ITEM_CACHEDIMAGE_SET', params);
  },
});
