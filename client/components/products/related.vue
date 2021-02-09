<template>
  <div class="related">
    <div class="header3">Produtos relacionados</div>
    <showcase-container
      v-if="relatedProducts"
      class="related__showcase"
      :products="relatedProducts"
    />

    <button-base
      class="related__back"
      title="Voltar para os produtos"

      @click="$router.push({ path: '/products' })"
    />

    <div class="related__positional" v-if="relatedProducts.length > 2">
      <div class="related__left" @click="moveLeft"></div>
      <div class="related__right" @click="moveRight"></div>
    </div>
  </div>
</template>

<script>
import ShowcaseContainer from './showcase.vue';

export default {
  components: {
    ShowcaseContainer,
  },
  data() {
    return {
      relatedProducts: [],
    };
  },
  mounted() {
    const items = this.$store.getters['product/items'];
    const { _id } = this.$store.getters['product/item'];

    if (!items || items.length === 0 || !items.filter) {
      return false;
    }

    const limit = items.length > 8 ? 8 : 4;

    this.relatedProducts = items
      .filter((item) => item._id !== _id)
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  },
  methods: {
    moveLeft() {
      this.$el.querySelector('.related__showcase').scrollBy(-250, 0);
    },
    moveRight() {
      this.$el.querySelector('.related__showcase').scrollBy(250, 0);
    },
  },
};
</script>

<style scoped src="./related.css"></style>
