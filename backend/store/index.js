import Vue from 'vue';
import Vuex from 'vuex';

import client from 'shared/store/modules/client';
import popup from 'shared/store/modules/popup';
import toast from 'shared/store/modules/toast';

import cart from 'shared/store/modules/cart';
import user from 'shared/store/modules/user';
import order from 'shared/store/modules/order';
import product from 'shared/store/modules/product';
import category from 'shared/store/modules/category';

import featured from 'shared/store/modules/featured';
import discount from 'shared/store/modules/discount';

import toastNotifier from 'shared/store/plugins/toastNotifier';

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    client,
    popup,
    toast,

    cart,
    user,
    order,
    product,
    category,

    featured,
    discount,
  },

  plugins: [toastNotifier],
});

export default store;
