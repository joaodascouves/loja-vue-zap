import Vue from 'vue';
import VueLazyLoad from 'vue-lazyload';
import Inputmask from 'inputmask';

import { mixin as VueClickAway } from 'vue-clickaway';

import storageService from 'shared/services/storageService';
import mixins from './mixins';

import { ButtonBase } from './components/_button';

import FormModel from './components/form-model.vue';
import ImageContainer from './components/image.vue';
import InputText from './components/_input/base.vue';

const _isLoggedIn = () => {
  const token = storageService.get('auth:token');

  return token ? token !== 'undefined' : false;
};

const loadMixins = (mixins, options) => Object.values(mixins).forEach((mixin) => {
  switch (typeof mixin) {
  case 'object':
    Vue.mixin(mixin);
    break;

  case 'function':
    Vue.mixin(mixin(options));
    break;
  }
});

function createApp(entry, options) {
  const { router, store, render } = options;

  Inputmask.extendDefinitions({
    '?': {
      validator: '.',
    },
  });

  Vue.use(VueLazyLoad);
  Vue.mixin(VueClickAway);

  Vue.directive('mask', {
    bind(el, binding) {
      if (binding.value && binding.value.mask) {
        Inputmask({
          autoUnmask: true,
          ...binding.value,
        }).mask(el);
      }
    },
  });

  // Vue.directive('click-outside', {
  //   bind: function(el, binding, vnode) {
  //     el.clickOutsideEvent = function(event) {
  //       if( !(el == event.target || el.contains(event.target) ) ) {
  //         vnode.context[binding.expression](event);
  //         event.stopPropagation();
  //       }
  //     };

  //     document.addEventListener('click', el.clickOutsideEvent);
  //   },

  //   unbind: function() {
  //     document.removeEventListener('click', el.clickOutsideEvent);
  //   },
  // });

  Vue.component('button-base', ButtonBase);
  Vue.component('input-text', InputText);
  Vue.component('form-model', FormModel);
  Vue.component('image-container', ImageContainer);

  loadMixins(mixins, { router, store });

  Object.assign(window, {
    _store: store,
    _router: router,
    _isLoggedIn,
  });

  const app = new Vue({
    render: render === undefined ? (h) => h(entry) : render,

    watch: {
      $route() {
        this.$root.$c_fromRoute = window._fromRoute;
      },
    },

    ...options,
  });

  const faDependencies = new Map([
    [
      'https://use.fontawesome.com/releases/v5.15.1/css/all.css',
      'sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp',
    ],
  ]);

  faDependencies.forEach((integrity, href) => {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    link.setAttribute('integrity', integrity);
    link.setAttribute('crossorigin', 'anonymous');

    document.head.appendChild(link);
  });

  if ('serviceWorker' in navigator) {
    const path = /^\/admin\//.test(location.pathname)
      ? '/admin/serviceWorker.js'
      : '/serviceWorker.js';

    navigator.serviceWorker.register(path).then(
      () => {
        console.log('Service worker registered.');
      },
      (error) => {
        console.warn('Service worker registration failed.');
        console.warn(error);
      },
    );
  }

  return app;
}

export { createApp, loadMixins, Vue };
