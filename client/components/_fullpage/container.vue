<template>
  <div class="fullinner">
    <div
      :class="{
        top: true,
        'top--shadow': $root.$c_business.theme.superShadow
      }"
    >
      <div class="top__options">
        <div class="top__options__right clickable" @click="goBackToStore">
          <span>Voltar para a loja</span>
          <i class="fa fa-arrow-right top__options__right__icon" />
        </div>
      </div>
      <!-- <div class="top__banner">
        <div class="top__logo clickable" @click="$router.push({ path: '/' })">
          <img :src="$root.$c_cachedLogo" />
        </div>
      </div> -->
    </div>

    <div class="inner">
      <!-- <navigation-container class="inner__navigation" /> -->
      <div class="inner__view">
        <div class="inner__view__header">
          <slot name="header"></slot>
        </div>
        <div class="inner__view__content">
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationContainer from 'shared/components/navigation.vue';

export default {
  components: {
    NavigationContainer,
  },
  data() {
    return {
      fromRoute: {},
    };
  },
  methods: {
    goBackToStore() {
      if (/^\/product/.test(this.$router.path)) {
        this.goBack({ path: '/products' });
      } else {
        this.$router.push({ path: '/' });
      }
    },
  },
};
</script>

<style scoped src="./container.css"></style>
