<template>
  <div class="sidebar">
    <category-bubble-container
      class="sidebar__item"
      :current="!$route.query.category"
      :category="{
        title: 'Todos os produtos'
      }"
    />
    <category-bubble-container
      class="sidebar__item"
      v-for="(category, index) in $store.getters['category/items']"
      :key="`category-${index}`"
      :current="$route.query.category === category.slug"
      :category="category"
    />
  </div>
</template>

<script>
import CategoryBubbleContainer from './category-bubble.vue';

export default {
  components: {
    CategoryBubbleContainer,
  },
};
</script>

<style scoped src="./sidebar.css"></style>
