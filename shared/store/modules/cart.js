import cartService from 'shared/services/cartService';
import storageService from 'shared/services/storageService';

import { isNumber } from 'shared/helpers';
import sharedModule from './_shared';

const module = sharedModule(cartService, { name: 'cart', ttl: 98000000 });

const cart = {
  ...module,

  mutations: {
    ...module.mutations,

    ITEMS_REFRESH(state) {
      state.items = storageService.get('cart')
        ? JSON.parse(storageService.get('cart'))
        : [];
    },

    ITEM_SAVE() {
      // state.items = [];
      // state.filtered = [];
    },
  },
  actions: {
    ...module.actions,

    save(store, payload) {
      return new Promise((resolve, reject) => {
        const items = payload.items.map((item) => ({
          item: item._id,
          quantity: item.quantity,
          variations: item.variations.map(({ name, selected }) => ({
            name,
            selected,
          })),
        }));

        return module.actions.save(store, { items }).then(
          (result) => {
            // storageService.save('cart', JSON.stringify([]));
            // store.commit('ITEMS_REFRESH');

            resolve(result);
          },
          (error) => {
            reject(error);
          },
        );
      });
    },

    initialize({ commit }) {
      commit('ITEMS_REFRESH');
    },
    addItem({ commit, state: { items } }, payload) {
      return new Promise((resolve, reject) => {
        if (isNumber(payload.stock) && payload.stock <= 0) {
          return reject();
        }

        const newItems = items;
        const item = newItems.find(
          ({ _id, variations }) => _id === payload._id
            && variations.reduce(
              (a, { name, selected }) => a
                + ((
                  payload.variations.find(
                    (variation) => variation.name === name,
                  ) || {}
                ).selected === selected
                  ? 1
                  : 0),
              0,
            )
              === Object.keys(variations.filter(({ selected }) => !!selected))
                .length,
        );

        if (item && isNumber(item.stock) && item.quantity >= item.stock) {
          return reject();
        }

        if (item) {
          item.quantity += 1;
        } else {
          newItems.push({
            ...payload,
            quantity: 1,
          });
        }

        storageService.save('cart', JSON.stringify(newItems));
        commit('ITEMS_REFRESH');

        resolve();
      });
    },
    removeItem({ commit }, index) {
      let items = [];

      if (storageService.get('cart')) {
        items = JSON.parse(storageService.get('cart'));
        items.splice(index, 1);

        storageService.save('cart', JSON.stringify(items));
        commit('ITEMS_REFRESH');
      }
    },
    changeQuantity({ commit }, { index, value }) {
      let items = [];

      if (isNaN(value) || value < 1) {
        value = 1;
      }

      if (storageService.get('cart')) {
        items = JSON.parse(storageService.get('cart'));

        if (
          items[index].quantity > value
          || !items[index].stock
          || items[index].quantity < items[index].stock
        ) {
          items[index].quantity = value;
        }

        if (
          isNumber(items[index].stock)
          && items[index].quantity >= items[index].stock
        ) {
          commit('ERROR_SET', {
            message: 'Esse é o limite',
            ref: {
              index,
            },
          });
        } else {
          commit('ERROR_CLEAR', { index });
        }

        storageService.save('cart', JSON.stringify(items));
        commit('ITEMS_REFRESH');
      }
    },
    clearItems({ commit }) {
      storageService.remove('cart');
      commit('ITEMS_REFRESH');
    },
  },
  getters: {
    ...module.getters,

    items: (state) => state.items,
    itemsCount: (state) => (!isNaN(state.items.length) ? state.items.length : 0),
    quantity: (state) => state.items.reduce((a, { quantity }) => a + quantity, 0),
    totalAmount: (state) => state.items.reduce(
      (a, { effectivePrice, quantity }) => a + Number(effectivePrice * quantity),
      0,
    ),
    totalSavings: (state) => state.items.reduce(
      (a, { price, effectivePrice, quantity }) => a + (price - effectivePrice) * quantity,
      0,
    ),
  },
};

export default cart;
