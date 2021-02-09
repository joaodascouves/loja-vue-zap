<template>
  <button-base
    bstyle="confirm"
    :margin="margin"
    :padding="padding"
    :sync="true"
    :disabled="disabled"
    @click="goToCheckout"
  >
    <!-- <span class="fab fa-instagram" /> -->
    <span>Comprar</span>
  </button-base>
</template>

<script>
import { addToCart } from './utils';

export default {
  props: {
    margin: {
      type: String,
      default: '0',
    },
    padding: {
      type: String,
      default: '0',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    goToCheckout() {
      addToCart(this).then(() => {
        this.$router.push({ path: '/cart' });
      });
    },
  },
};
</script>
