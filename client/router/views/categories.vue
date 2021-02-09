<template>
  <div class="categories">
    <div class="category">
      <div
        class="category__image category__image--multiple clickable"
        @click="$router.push({ path: '/products/all' })"
      >
        <image-container
          v-for="(product, index) in products.slice(0, 4)"
          :key="`all-products-${index}`"
          :src="product.image"
        />
      </div>

      <div class="category__info">
        <div class="category__title">Todos os produtos</div>
        <div class="category__description"></div>
        <div
          class="category__link clickable"
          @click="$router.push({ path: '/products/all' })"
        >
          Ver todos os produtos
        </div>
      </div>
    </div>
    <div
      class="category"
      v-for="(category, index) in categories"
      :key="`category-${index}`"
    >
      <image-container
        class="category__image clickable"
        :src="category.image"
        @click.native="viewCategory(category)"
      />

      <div class="category__info">
        <div class="category__title">{{ category.title }}</div>
        <div class="category__description">{{ category.description }}</div>
        <div class="category__link clickable" @click="viewCategory(category)">
          Ver categoria
        </div>
      </div>

      <div
        class="category__products"
        v-if="productsFromCategoryCount(category) > 0"
      >
        <div
          class="product clickable"
          v-for="(product, pindex) in productsFromCategory(category).slice(
            0,
            2
          )"
          :key="`product-${index}-${pindex}`"
          @click="viewItem({ product })"
        >
          <image-container :src="product.image" :alt="product.title" />
        </div>
        <div
          class="product product--count clickable"
          @click="viewCategory(category)"
          v-if="productsFromCategoryCount(category) > 2"
        >
          <span class="product__count">
            <i class="product__count__icon fa fa-plus" />
            <span class="product__count__number">{{
              productsFromCategoryCount(category)
            }}</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    categories() {
      return this.$store.getters['category/items']
        .sort((a, b) => (a.image ? -1 : 1));
    },
    products() {
      return this.$store.getters['product/items'];
    },
  },
  methods: {
    viewCategory(category) {
      this.$router.push({ path: `/products/all?category=${category.slug}` });
    },
    productsFromCategory(category) {
      return this.products.filter((product) => product.categories.find(({ slug }) => slug === category.slug));
    },
    productsFromCategoryCount(category) {
      const count = this.productsFromCategory(category).length;

      return count > 2 ? count - 2 : count;
    },
  },
};
</script>

<style scoped src="./categories.css"></style>
