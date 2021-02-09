import { app, store } from './app';

store.dispatch('client/get').then(async (configuration) => {
  app.$root.$c_business = configuration;
  app.$mount('#root');
});
