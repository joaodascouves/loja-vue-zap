import discountService from 'shared/services/discountService';
import sharedModule from './_shared';

const module = sharedModule(discountService, { name: 'discount' });

const discount = {
  ...module,

  actions: {
    ...module.actions,

    adminGet(store, payload) {
      return module.actions.get(store, {
        ...payload,
        _route: 'adminGet',
      });
    },
  },
};

export default discount;
