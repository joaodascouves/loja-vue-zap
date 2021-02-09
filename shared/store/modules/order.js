import orderService from 'shared/services/orderService';
import sharedModule from './_shared';

import * as shipment from './_shipment';

const module = sharedModule(orderService);

const order = {
  ...module,

  state: {
    ...module.state,
    ...shipment.state,

    item: {
      payment: {},
    },
  },

  mutations: {
    ...module.mutations,
    ...shipment.mutations,
  },

  actions: {
    ...module.actions,
    ...shipment.actions,

    save(store, payload) {
      return new Promise((resolve, reject) => {
        const shipmentService = store.rootGetters['order/selectedShipmentService'];

        const paymentMethod = store.state.item.payment.payment || {};

        const {
          // unused
          role,
          slug,
          created_at,
          updated_at,

          location,
          ...user
        } = store.rootGetters['user/currentUser'];

        const discount = store.rootGetters['discount/item'];

        if (Object.keys(shipmentService).length === 0) {
          store.dispatch('spawnError', {
            message: 'Escolha o método de entrega',
          });

          return reject();
        }

        if (Object.keys(paymentMethod).length === 0) {
          store.dispatch('spawnError', {
            message: 'Escolha a forma de pagamento',
          });

          return reject();
        }

        return store.dispatch('cart/save', payload, { root: true }).then(
          ({ _id }) => {
            module.actions
              .save(store, {
                cart: _id,

                user,
                location,
                shipmentService: shipmentService._id,
                payment: paymentMethod,

                ...(discount._id ? { discount: discount._id } : {}),
              })
              .then(resolve, reject);
          },
          () => {
            reject();
          },
        );
      });
    },

    adminSave({ commit, dispatch }, payload) {
      dispatch('shiftLoading', true);

      return new Promise((resolve, reject) => orderService
        .post('adminSave', payload)
        .then(
          ({ data: { result, _message } }) => {
            commit('ITEM_SAVE', result);

            if (_message) {
              dispatch('spawnInfo', {
                message: _message,
                ref: result,
              });
            }

            resolve(result);
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
  },

  getters: {
    ...module.getters,
    ...shipment.getters,
  },
};

export default order;
