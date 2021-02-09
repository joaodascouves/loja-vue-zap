import productService from 'shared/services/productService';
import sharedModule from './_shared';

import * as variations from './_variation';

const module = sharedModule(productService, { name: 'product' });

const emptyProduct = {
  price: 0,
  discount: 0,
  images: [],
  sizes: [],
  categories: [],
  variations: [],

  file: {},
  files: [],
  pack: { weight: 0 },
};

const prepareVariations = (object) => {
  if (!object.variations || !Array.isArray(object.variations)) {
    return object;
  }

  return {
    ...object,
    variations: object.variations.map((variation) => ({
      ...variation,
      selected: false,
    })),
  };
};

const product = {
  ...module,

  state: {
    ...module.state,
    item: emptyProduct,

    file: {},
    files: [],
  },

  mutations: {
    ...module.mutations,
    ...variations.mutations,

    ITEM_CLEAR(state) {
      state.file = {};
      state.files = [];
      state.image = '';
      state.images = [];
    },

    ITEM_GET(state, item) {
      const newItem = prepareVariations(item);
      module.mutations.ITEM_GET(state, newItem);
    },

    ITEMS_GET(state, { items }) {
      const newItems = items.map((item) => ({
        ...prepareVariations(item),
        cachedImages: 0,
      }));

      module.mutations.ITEMS_GET(state, { items: newItems });
    },

    IMAGE_ADD(state) {
      state.item.images.push('');
      state.files.push({});
    },

    FILE_SET(state, file) {
      state.file = file;
    },

    FILE_EXTRA_SET(state, { file, index }) {
      state.files[index] = file;
    },
  },

  actions: {
    ...module.actions,
    ...variations.actions,

    async save(store, payload) {
      await module.actions.save(store, payload);
      store.commit('ITEM_CLEAR');
    },

    addImage({ commit }) {
      commit('IMAGE_ADD');
    },
    clear({ commit }) {
      commit('ITEM_CLEAR');
      commit('ITEM_SAVE', emptyProduct);
    },

    setFile({ commit }, file) {
      commit('FILE_SET', file);
    },

    setExtraFile({ commit }, { file, index }) {
      console.log({ file });
      commit('FILE_EXTRA_SET', { file, index });
    },
  },
  getters: {
    ...module.getters,
    ...variations.getters,

    item: ({ item }) => ({
      ...item,
      files:
        item.files && Array.isArray(item.files)
          ? item.files
          : item.images && Array(item.images.length),
    }),

    file: ({ file }) => file,

    files: ({ files }) => files.filter((file) => file && (!!file.content || !!file.link)),
  },
};

export default product;
