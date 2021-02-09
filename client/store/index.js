import Vue from 'vue';
import Vuex from 'vuex';

import client from 'shared/store/modules/client';
import popup from 'shared/store/modules/popup';
import toast from 'shared/store/modules/toast';

import user from 'shared/store/modules/user';
import product from 'shared/store/modules/product';
import category from 'shared/store/modules/category';
import order from 'shared/store/modules/order';

import featured from 'shared/store/modules/featured';
import discount from 'shared/store/modules/discount';

import toastNotifier from 'shared/store/plugins/toastNotifier';
import cache from 'shared/store/plugins/cache';
import cart from 'shared/store/modules/cart';
import dynamicTitles from './plugins/dynamicTitles';

import meta from './modules/meta';
import pagseguro from './modules/pagseguro';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    client,
    popup,
    toast,

    user,
    product,
    category,
    order,

    featured,
    discount,

    meta,
    cart,
    pagseguro,
  },

  plugins: [
    toastNotifier,
    dynamicTitles,

    ...(!sessionStorage.getItem('noIdb') ? [cache] : []),
  ],
});

export default store;
