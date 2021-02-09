import { createApp, loadMixins, Vue } from 'shared/createApp';

import App from './components/app.vue';

import router from './router';
import store from './store';

import mixins from './mixins';

const app = createApp(App, {
  router,
  store,

  watch: {
    $route: {
      immediate: false,
      handler(event) {
        Vue.nextTick(() => {
          const { fullPath } = event;
          const previousPath = window._fromRoute.fullPath;

          if (!/list?\/?/.test(previousPath) && previousPath !== '/') {
            const context = (fullPath.match(/\/(\w+)\/(modify|add)/) || [])[1];

            if (context) {
              store.dispatch(`${context}/clear`);
            }
          }
        });
      },
    },
  },
});

loadMixins(mixins, { router, store });

/* popup components */
Vue.component('share-product-popup', () => import('./components/utils/popups/share-product.vue'));

export { app, router, store };
