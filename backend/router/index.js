import Vue from 'vue';
import VueRouter from 'vue-router';

import {
  globalPreMiddleware,
  globalPostMiddleware,
} from 'shared/router/middlewares';

import BaseComponent from 'shared/components/base.vue';
import storageService from 'shared/services/storageService';
import NotFound from './views/404.vue';

import Dashboard from './views/dashboard.vue';
import SiteRedirect from './views/site-redirect.vue';

import AuthSignIn from './views/auth/signin.vue';

import OrderModify from './views/order/modify.vue';
import OrderList from './views/order/list.vue';

import ProductModify from './views/product/modify.vue';
import ProductList from './views/product/list.vue';

import ProductDiscountModify from './views/product/discount/modify.vue';
import ProductDiscountList from './views/product/discount/list.vue';

import CategoryModify from './views/category/modify.vue';
import CategoryList from './views/category/list.vue';

import CustomizationFeaturedModify from './views/customization/featured/modify.vue';
import CustomizationFeaturedList from './views/customization/featured/list.vue';

import CustomizationTheme from './views/customization/theme.vue';
import CustomizationTextSections from './views/customization/text-sections.vue';

import ConfigurationBusiness from './views/configuration/business.vue';
import ConfigurationShipment from './views/configuration/shipment.vue';
import ConfigurationPayment from './views/configuration/payment.vue';
import ConfigurationGlobalVariations from './views/configuration/global-variations.vue';

import UserModify from './views/user/modify.vue';
import UserList from './views/user/list.vue';

const currentUserSlug = (
  JSON.parse(storageService.get('auth:currentUser')) || {}
).slug;

Vue.use(VueRouter);

const publicRoutes = [
  {
    path: '/',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
    },
  },
  {
    path: '/preview',
    component: SiteRedirect,
    meta: {
      title: 'Visualização',
    },
  },
  {
    path: '/auth',
    component: BaseComponent,
    meta: {
      title: 'Área restrita',
      hidden: true,
    },
    children: [
      {
        path: 'signin',
        component: AuthSignIn,
        meta: {
          title: 'Autenticação',
          fullpage: true,
        },
      },
    ],
  },
];

const privateRoutes = [
  {
    path: '/order',
    redirect: '/order/list',
    component: BaseComponent,
    meta: { title: 'Pedidos' },
    children: [
      {
        path: 'modify/:id',
        component: OrderModify,
        meta: {
          title: 'Modificar',
          hidden: true,
        },
      },
      {
        path: 'list',
        component: OrderList,
        meta: {
          title: 'Listar',
        },
      },
    ],
  },
  {
    path: '/product',
    redirect: '/product/list',
    component: BaseComponent,
    meta: {
      title: 'Produtos',
    },
    children: [
      {
        path: 'add',
        component: ProductModify,
        meta: {
          title: 'Adicionar',
        },
      },
      {
        path: 'modify/:slug',
        component: ProductModify,
        meta: {
          title: 'Modificar',
          hidden: true,
        },
      },
      {
        path: 'list',
        component: ProductList,
        meta: {
          title: 'Listar',
        },
      },
      {
        path: 'discount',
        redirect: '/product/discount/list',
        component: BaseComponent,
        meta: {
          title: 'Cupons de desconto',
        },
        children: [
          {
            path: 'add',
            component: ProductDiscountModify,
            meta: {
              title: 'Adicionar',
            },
          },
          {
            path: 'modify/:id',
            component: ProductDiscountModify,
            meta: {
              title: 'Modificar',
              hidden: true,
            },
          },
          {
            path: 'list',
            component: ProductDiscountList,
            meta: {
              title: 'Listar',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/category',
    redirect: '/category/list',
    component: BaseComponent,
    meta: {
      title: 'Categorias',
    },
    children: [
      {
        path: 'add',
        component: CategoryModify,
        meta: {
          title: 'Adicionar',
        },
      },
      {
        path: 'modify/:slug',
        component: CategoryModify,
        meta: {
          title: 'Modificar',
          hidden: true,
        },
      },
      {
        path: 'list',
        component: CategoryList,
        meta: {
          title: 'Listar',
        },
      },
    ],
  },
  {
    path: '/customization',
    redirect: '/customization/featured/list',
    component: BaseComponent,
    meta: {
      title: 'Personalização',
    },
    children: [
      {
        path: 'theme',
        component: CustomizationTheme,
        meta: {
          title: 'Tema',
        },
      },
      {
        path: 'featured',
        redirect: 'featured/list',
        component: BaseComponent,
        meta: {
          title: 'Imagens em destaque',
        },
        children: [
          {
            path: 'add',
            component: CustomizationFeaturedModify,
            meta: {
              title: 'Adicionar',
            },
          },
          {
            path: 'modify/:slug',
            component: CustomizationFeaturedModify,
            meta: {
              title: 'Modificar',
            },
          },
          {
            path: 'list',
            component: CustomizationFeaturedList,
            meta: {
              title: 'Listar',
            },
          },
        ],
      },
      {
        path: 'text-sections',
        component: CustomizationTextSections,
        meta: {
          title: 'Seções customizáveis',
        },
      },
    ],
  },
  {
    path: '/user',
    redirect: '/user/list',
    component: BaseComponent,
    meta: {
      title: 'Usuários',
    },
    children: [
      {
        path: 'me',
        redirect: `modify/${currentUserSlug}`,
        meta: {
          title: 'Minha conta',
        },
      },
      {
        path: 'add',
        component: UserModify,
        meta: {
          title: 'Adicionar',
        },
      },
      {
        path: 'modify/:slug',
        component: UserModify,
        meta: {
          title: 'Modificar',
          hidden: true,
        },
      },
      {
        path: 'list',
        component: UserList,
        meta: {
          title: 'Listar',
        },
      },
    ],
  },
  {
    path: '/configuration',
    component: BaseComponent,
    meta: {
      title: 'Configurações',
    },
    children: [
      {
        path: 'business',
        component: ConfigurationBusiness,
        meta: {
          title: 'Negócio',
        },
      },
      {
        path: 'shipment',
        component: ConfigurationShipment,
        meta: {
          title: 'Serviços de entrega',
        },
      },
      {
        path: 'payment',
        component: ConfigurationPayment,
        meta: {
          title: 'Meios de pagamento',
        },
      },
      {
        path: 'global-variations',
        component: ConfigurationGlobalVariations,
        meta: {
          title: 'Variações globais',
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

const router = new VueRouter({
  mode: 'history',
  base: '/admin/',
  routes: [...publicRoutes, ...privateRoutes],
});

/* eslint-disable no-unused-vars */
router.beforeEach(async function (to, from, next) {
  await globalPreMiddleware(arguments);

  if (!window._isLoggedIn() && !/^\/auth/.test(to.path)) {
    next({ path: '/auth/signin' });
  } else {
    next();
  }
});

router.afterEach(function (to, from) {
  Vue.nextTick(() => globalPostMiddleware(arguments));
});
/* eslint-enable no-unused-vars */

export default router;
