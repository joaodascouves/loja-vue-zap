<template>
  <div
    class="grid"
    :style="
      `
            --justify-content: ${justifyContent};
        `
    "
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    justifyContent: {
      type: String,
      default: 'space-around',
    },
  },
};
</script>

<style scoped src="./grid.css"></style>
