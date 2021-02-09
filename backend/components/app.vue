<template>
  <div
    class="app"
    :style="
      `
        --foreground-color-1: white;
        --input-text-color: #fff;
        --input-hint-color: #ddd;
      `
    "
  >
    <popup-base />

    <main v-if="!$route.meta.fullpage" id="main-view" class="page">
      <navigation-container
        v-if="$route.path !== '/'"
        :key="`path-${$route.path}`"
      />

      <router-view :class="{ 'backdrop-faded': !!show }" />
    </main>

    <main v-else>
      <router-view />
    </main>

    <div v-if="!$route.meta.fullpage">
      <super-container @toggle="toggleMenu" />
      <menu-container
        :class="{ show }"
        @toggle="toggleMenu"
        v-on-clickaway="hideMenu"
      />
      <!-- <bottom-container /> -->
    </div>

    <toast-info />
    <toast-error />
    <toast-loading />
  </div>
</template>

<script>
import App from 'shared/app';
import store from 'backend/store';

import NavigationContainer from 'shared/components/navigation.vue';
import PopupBase from 'shared/components/_popup/base.vue';

import { ToastError, ToastInfo, ToastLoading } from 'shared/components/_toast';

import MenuContainer from './common/menu.vue';
import SuperContainer from './common/super.vue';
import BottomContainer from './common/bottom.vue';

export default {
  extends: App,

  data() {
    return {
      show: false,
    };
  },
  components: {
    PopupBase,

    SuperContainer,
    MenuContainer,
    NavigationContainer,
    BottomContainer,

    ToastError,
    ToastInfo,
    ToastLoading,
  },
  methods: {
    toggleMenu(value) {
      this.show = value || !this.show;
    },
  },
  watch: {
    '$store.getters.isLoading': (isLoading) =>
      // eslint-disable-next-line no-return-assign
      document
        .querySelectorAll('input')
        .forEach((element) => (element.disabled = isLoading)),
    '$store.getters.errorExists': (errorExists) => errorExists && setTimeout(() => store.dispatch('clearError'), 3000),
    '$store.getters.infoExists': (infoExists) => infoExists && setTimeout(() => store.dispatch('clearInfo'), 3000),
  },
};
</script>

<style scoped src="./app.css"></style>
