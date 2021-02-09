<template>
  <div
    :class="{
      super: true,
      'super--shadow': $root.$c_business.theme.superShadow,
      'super--visible': isVisible,
    }"
  >
    <div class="super__menu" @click="$emit('toggle')">
      <i class="super__icon fas fa-bars clickable" />
    </div>

    <div class="super__logo clickable header2" @click="goToHome">
      <img :src="$root.$c_cachedLogo" />
    </div>

    <!-- <search-bar-container @searchToggled="fadeLogo" /> -->
    <input-text
      class="super__search"

      name="search"
      placeholder="Buscar"
      icon="fa fa-search"

      @input="$router.push({ path: `/products/all?search=${$event.target.value}` })"
    />

    <div class="super__search__mobile" @click="$emit('searchMobile', $event)">
      <i class="super__icon fas fa-search" />
    </div>

    <div class="super__user">
      <router-link to="/customer">
        <i class="super__icon fas fa-user clickable" />
      </router-link>
    </div>

    <div class="super__cart" @click="$router.push({ path: '/cart' })">
      <i class="super__icon fas fa-shopping-bag clickable" />
      <span
        class="super__cart__count"
        v-if="$store.getters['cart/quantity'] > 0"
        :data-quantity="$store.getters['cart/quantity']"
      />
    </div>
  </div>
</template>

<script>
// import SearchBarContainer from '../utils/search-bar.vue';

export default {
  // components: {
  //   SearchBarContainer,
  // },
  data() {
    return {
      pageYOffset: 0,
      isVisible: true,
    };
  },
  methods: {
    // fadeLogo() {
    //   this.$el.querySelector('.super__logo').classList.toggle('faded');
    // },
    goToHome() {
      if (this.$route.path !== '/') {
        this.$router.push({ path: '/' });
      } else {
        window.scrollTo(0, 0);
      }
    },
  },
  computed: {
    cartQuantity() {
      return this.$store.getters['cart/quantity'];
    },
  },
  mounted() {
    window.onscroll = () => {
      let {
        pageYOffset,
        lastYOffset,

      } = window;

      if (pageYOffset < 0) {
        this.pageYOffset = 0;
        return;
      }

      lastYOffset = lastYOffset || 0;

      this.pageYOffset = pageYOffset;
      this.isVisible = pageYOffset < lastYOffset;

      window.lastYOffset = pageYOffset;
    };
  },
  watch: {
    cartQuantity(newValue, oldValue) {
      // if (newValue <= oldValue) {
      //   return;
      // }
      // const plus = this.$el.querySelector('#plus');
      // plus.classList.remove('play');
      // plus.setAttribute('data-quantity', newValue - oldValue);
      // void plus.offsetWidth;
      // plus.classList.add('play');
    },
  },
};
</script>

<style scoped src="static/styles/shared/super.css"></style>
<style scoped src="./super.css"></style>
