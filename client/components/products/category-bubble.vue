<template>
  <div
    class="bubble"
    @click="
      $router.push({
        path: `/products/${
          category.slug ? `all?category=${category.slug}` : 'all'
        }`
      })
    "
  >
    <span class="bubble__title">{{ category.title }}</span>
    <i class="bubble__icon fa fa-check" v-if="current" />
  </div>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true,
    },
    current: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped src="./category-bubble.css"></style>
