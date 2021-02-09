<template>
  <div
    class="app"
    :style="
      `
        --foreground-color-1: #2020dd;
        --input-text-color: #333;
        --input-hint-color: #666;
        --thematic-color-1: ${$root.$c_theme.thematicColor1};
        --thematic-color-2: ${$root.$c_theme.thematicColor2};
        --thematic-color-3: ${$root.$c_theme.thematicColor3};
        --thematic-color-4: ${$root.$c_theme.thematicColor4};
      `
    "
  >
    <modal-base />
    <popup-base />

    <div v-if="!$route.meta.fullpage">
      <super-container
        :class="{ 'backdrop-faded': show }"
        @toggle="toggleMenu"
        @searchMobile="searchMobile"

      />

      <menu-container
        :class="{ show }"
        @toggle="toggleMenu"
        v-on-clickaway="hideMenu"
      />
    </div>

    <main
      v-if="!$route.meta.fullpage"
      id="main-view"
      :class="{
        page: true,
        'backdrop-faded': show
      }"
    >
      <navigation-container
        v-if="
          $route.path !== '/' ||
            ($root.$c_fromRoute && $root.$c_fromRoute.meta.title)
        "
        :class="{
          navigation: true,
          'navigation--hidden': $route.path === '/'
        }"
      />

      <transition name="slide" mode="out-in">
        <router-view :key="`route-${$route.path}`" />
      </transition>

      <!-- <div class="dummy-spacer"></div>
          <disclaimer-container /> -->
    </main>

    <main v-else>
      <router-view />
    </main>

    <div v-if="!$route.meta.fullpage" :class="{ 'backdrop-faded': show }">
      <!-- <menu-container
            :class="{ show }"
            @toggle="toggleMenu"
          />
          <super-container
              @toggle="toggleMenu"
          /> -->

      <bottom-container />
      <credits-container />
    </div>

    <cart-shortcut
      v-if="!$route.meta.fullpage && $store.getters['cart/quantity'] > 0"
      :class="{ 'backdrop-faded': show }"
    />
  </div>
</template>

<script>
import App from 'shared/app';
import store from 'client/store';

import NavigationContainer from 'shared/components/navigation.vue';

import PopupBase from 'shared/components/_popup/base.vue';
import ModalBase from 'shared/components/_modal/base.vue';

import StoreSingleton from 'shared/idb/singleton';
import SuperContainer from './common/super.vue';
import MenuContainer from './common/menu.vue';

import DisclaimerContainer from './common/disclaimer.vue';
import BottomContainer from './common/bottom.vue';
import CreditsContainer from './common/credits.vue';

import CartShortcut from './common/cart-shortcut.vue';

export default {
  extends: App,

  data() {
    return {
      show: false,
    };
  },
  components: {
    PopupBase,
    ModalBase,

    SuperContainer,
    MenuContainer,
    NavigationContainer,
    BottomContainer,
    CreditsContainer,

    DisclaimerContainer,
    CartShortcut,
  },
  methods: {
    searchMobile() {
      this.toggleMenu(true);
    },
  },
  async beforeMount() {
    await store.dispatch('cart/initialize');
  },
  mounted() {
    // if (document.documentElement.clientWidth <= 600) {
    //   store.dispatch('changePopup', {
    //     popup: {
    //       id: 'fullscreen',
    //       title: 'Modo fullscreen',
    //       message: 'Para uma melhor experiência de usuário,\
    //       clique em OK para ativar o modo fullscreen.',
    //     },
    //   });
    // }
  },
  watch: {
    '$store.getters.currentModal': (value) => {
      document.body.style['overflow-y'] = value ? 'visible' : 'scroll';
    },
    // '$store.getters.popupAccepted': {
    //   deep: true,
    //   handler({ id }) {
    //     if (id === 'fullscreen') {
    //       document.documentElement.requestFullscreen();
    //       store.dispatch('closePopup');
    //     }
    //   },
    // },
  },
};
</script>

<style scoped src="./app.css"></style>
