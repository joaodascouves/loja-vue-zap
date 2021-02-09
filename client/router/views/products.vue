<template>
  <div class="products">
    <div class="header3 header3--nofloat">
      {{ header }}
    </div>

    <sidebar-container
      @update="products = $store.getters['product/filtered']"
    />

    <showcase-container class="products__showcase" :products="products" />
  </div>
</template>

<script>
import ShowcaseContainer from 'client/components/products/showcase.vue';
import SidebarContainer from 'client/components/products/sidebar.vue';

import store from 'client/store';

function _filterProducts(route) {
  const {
    query: { category, search },
  } = route;

  if (category !== undefined) {
    store.dispatch('product/filter', {
      categories: {
        value: [{ slug: category }],
      },
    });
  } else if (search !== undefined) {
    store.dispatch('product/filter', {
      title: {
        value: search,
      },
    });
  } else {
    store.dispatch('product/clearFilter');
  }
}

export default {
  components: {
    ShowcaseContainer,
    SidebarContainer,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    header() {
      const { category, search } = this.$route.query;

      if (category) {
        const _category = this.$store.getters['category/items'].filter(
          (cat) => cat.slug === category,
        );

        return _category.length > 0
          ? `Categoria: ${_category[0].title}`
          : 'Categoria não encontrada';
      }

      if (search && search.length > 0) {
        return `Resultados para: ${search}`;
      }

      return 'Todos os produtos';
    },
  },
  methods: {
    filterProducts() {
      _filterProducts(this.$route);
      this.products = this.$store.getters['product/filtered'];
    },
  },
  // mounted() {
  //   this.filterProducts();
  // },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      _filterProducts(to);
      vm.products = store.getters['product/filtered'];
    });
  },
  watch: {
    $route: {
      deep: true,
      immediate: false,
      handler(event) {
        this.filterProducts();
      },
    },
  },
};
</script>

<style scoped src="./products.css"></style>
