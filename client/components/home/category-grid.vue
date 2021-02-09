<template>
  <div class="category-grid" v-if="$store.getters['category/itemsCount'] > 0">
    <div class="grid">
      <div
        class="grid__photo"
        v-for="(category, index) in categories"
        :key="`category-${index}`"
        :data-title="category.title"
        @click="
          $router.push({ path: `/products/all?category=${category.slug}` })
        "
      >
        <image-container class="rounded" :src="category.image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters['category/items'].filter(
        (category) => typeof category.image === 'string',
      );
    },
  },
};
</script>

<style scoped src="./photo-grid.css"></style>
<style scoped src="./category-grid.css"></style>
