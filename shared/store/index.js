import Vue from 'vue';
import Vuex from 'vuex';

import popup from './modules/meta';
import toast from './modules/toast';

import user from './modules/user';
import product from './modules/product';
import category from './modules/category';

import toastNotifier from './plugins/toastNotifier';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    popup,
    toast,

    meta,

    user,
    product,
    category,
  },

  plugins: [toastNotifier],
});

export default store;
