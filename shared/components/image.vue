<template>
  <img v-if="src" v-lazy="src" :alt="alt" />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: false,
    },
    alt: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped src="./image.css"></style>
