<template>
  <div class="discount" v-if="discount">{{ discount }}% off</div>
</template>

<script>
export default {
  props: {
    discount: {
      type: Number,
      required: false,
    },
  },
};
</script>

<style scoped src="./discount-bar.css"></style>
