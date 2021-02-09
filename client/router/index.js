import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  globalPreMiddleware,
  globalPostMiddleware,
} from 'shared/router/middlewares';

import BaseComponent from 'shared/components/base.vue';

import NotFound from './views/404.vue';
import Home from './views/home.vue';
import TextSections from './views/text-sections.vue';

import Product from './views/product.vue';
import Products from './views/products.vue';
import Categories from './views/categories.vue';

import Cart from './views/cart.vue';
import Checkout from './views/checkout.vue';
import Success from './views/success.vue';
import Order from './views/order.vue';

import CustomerSecureBase from './views/customer/secure/base.vue';
import CustomerSecureMe from './views/customer/secure/me.vue';
import CustomerSecureAccount from './views/customer/secure/account.vue';
import CustomerSecureOrders from './views/customer/secure/orders.vue';

import CustomerSignin from './views/customer/signin.vue';
import CustomerSignup from './views/customer/signup.vue';

Vue.use(VueRouter);

const publicRoutes = [
  {
    path: '/',
    component: Home,
    meta: {
      title: 'Home',
      public: true,
      priority: 1,
    },
  },
  {
    path: '/about',
    component: TextSections,
    meta: {
      title: 'Sobre nós',
      public: true,
    },
  },
  {
    path: '/terms-of-use',
    component: TextSections,
    meta: {
      title: 'Termos de Uso',
      public: true,
    },
  },
  {
    path: '/cart',
    component: Cart,
    meta: {
      title: 'Carrinho',
      public: true,
      hidden: true,
      fullpage: true,
    },
  },
  {
    path: '/checkout',
    component: Checkout,
    meta: {
      title: 'Checkout',
      public: true,
      hidden: true,
      fullpage: true,
    },
  },
  {
    path: '/success',
    component: Success,
    meta: {
      title: 'Sucesso',
      public: true,
      hidden: true,
      fullpage: true,
    },
  },
  {
    path: '/order/:id',
    component: Order,
    meta: {
      title: 'Pedido',
      public: true,
      hidden: true,
      fullpage: true,
    },
  },
  {
    path: '/product/:slug',
    component: Product,
    meta: {
      title: 'Produto',
      public: true,
      hidden: true,
    },
  },
  {
    path: '/products',
    redirect: '/products/categories',
    component: BaseComponent,
    meta: {
      title: 'Produtos',
      public: true,
      priority: 0.9,
    },
    children: [
      {
        path: 'all',
        component: Products,
        meta: {
          title: 'Todos os produtos',
          public: true,
        },
      },
      {
        path: 'categories',
        component: Categories,
        meta: {
          title: 'Categorias',
          public: true,
        },
      },
    ],
  },
  {
    path: '/customer',
    component: BaseComponent,
    redirect: '/customer/signin',
    children: [
      {
        path: 'secure',
        component: CustomerSecureBase,
        redirect: 'secure/me',
        children: [
          {
            path: 'me',
            component: CustomerSecureMe,
            meta: {
              title: 'Resumo da conta',
              public: false,
              fullpage: true,
            },
          },
          {
            path: 'account',
            component: CustomerSecureAccount,
            meta: {
              title: 'Dados cadastrais',
              public: false,
              fullpage: true,
            },
          },
          {
            path: 'orders',
            component: CustomerSecureOrders,
            meta: {
              title: 'Histórico de pedidos',
              public: false,
              fullpage: true,
            },
          },
        ],
      },
      {
        path: 'signin',
        component: CustomerSignin,
        meta: {
          title: 'Login',
          public: true,
          fullpage: true,
        },
      },
      {
        path: 'signup',
        component: CustomerSignup,
        meta: {
          title: 'Cadastro',
          public: true,
          fullpage: true,
        },
      },
    ],
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      title: '404',
      hidden: true,
    },
  },
];

const privateRoutes = [
  //
];

const publishedRoutes = ['/cart', '/checkout', '/products'];

const router = new VueRouter({
  mode: 'history',
  routes: [...publicRoutes, ...privateRoutes],
});

document.addEventListener('clientLoaded', ({ detail }) => {
  window._business = detail;
});

/* eslint-disable no-unused-vars */
router.beforeEach(async function (to, from, next) {
  await globalPreMiddleware(arguments);

  if (
    !window._isLoggedIn()
    && to.meta.public !== true
    && router.resolve(to.path).resolved.meta.title !== '404'
  ) {
    next({ path: '/customer/signin' });
  } else {
    next();
  }
});

router.afterEach(function (to, from) {
  if (
    window._business.published === false
    && publishedRoutes.includes(to.path)
  ) {
    router.push({ path: '/' });
    return;
  }

  Vue.nextTick(() => globalPostMiddleware(arguments));
});
/* eslint-enable no-unused-vars */

export default router;
