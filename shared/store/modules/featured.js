import featuredService from 'shared/services/featuredService';
import sharedModule from './_shared';

const module = sharedModule(featuredService, { name: 'featured' });

const featured = {
  ...module,

  actions: {
    ...module.actions,

    adminGetAll: (store) => module.actions.getAll(store, {
      _route: 'adminGetAll',
    }),
  },
};

export default featured;
