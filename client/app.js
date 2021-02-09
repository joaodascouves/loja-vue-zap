import { createApp, Vue } from 'shared/createApp';

import App from './components/app.vue';
import Loading from './components/common/loading.vue';

import router from './router';
import store from './store';

const render = (h) => h(store.getters.isSplashscreen === true ? Loading : App);

const app = createApp(App, {
  router,
  store,

  render,
});

Vue.mixin({
  computed: {
    computedSubtotal() {
      let subtotal = this.$store.getters['cart/totalAmount'];
      const { discount } = this.$store.getters['discount/item'];

      if (discount && discount > 0) {
        subtotal -= (subtotal * parseInt(discount)) / 100;
      }

      return subtotal;
    },
  },
});

export { app, router, store };
