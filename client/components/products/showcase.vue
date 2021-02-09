<template>
  <div class="grid">
    <thumb-container
      class="grid__item"
      v-for="(product, index) in products"
      :key="index"
      v-bind:product="product"
    />
  </div>
</template>

<script>
import ThumbContainer from '../product/thumb.vue';

export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
  components: {
    ThumbContainer,
  },
  beforeDestroy() {
    this.$store.dispatch('product/clearFilter');
  },
};
</script>

<style scoped src="./showcase.css"></style>
