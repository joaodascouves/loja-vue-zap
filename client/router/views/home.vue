<template>
  <div class="centered home">
    <div v-if="$store.getters['product/isLoading'] === true">
      <span>Carregando...</span>
    </div>

    <div v-if="$root.$c_business.published === true">
      <photo-slide-container ref="photoSlide" class="home__block--nomargin" />

      <div v-if="hasProducts">
        <div
          :class="{
            home__block: true,
            'home__block--nomargin': !hasFeatured,
            'home__block--first': hasFeatured
          }"
        >
          <div class="header3 header3--first">
            Últimos lançamentos
          </div>

          <showcase-container :products="lastReleases" />

          <button-base
            class="home__button"
            title="Ver todos os produtos"

            :sync="true"
            @click="$router.push({ path: '/products' })"
          />
        </div>

        <div class="home__block" v-if="lastSales.length > 0">
          <div class="header3">Promoções</div>
          <showcase-container :products="lastSales" />
        </div>

        <div class="home__block">
          <div class="header3" v-if="hasCategories">Categorias</div>
          <category-grid-container class="full-width" />
        </div>
      </div>
      <!--
            <div class="home__block" v-else>
              <div class="home__empty" v-if="$store.getters.isLoading === false">
                Ainda não temos produtos cadastrados.
              </div>
              <div v-else>
                Carregando...
              </div>
            </div> -->
    </div>

    <div v-else>
      <span>O site encontra-se fora do ar para manutenção.</span>
    </div>

    <instagram-grid-container
      :class="{
        home__block: true,
        'home__block--nomargin': !hasFeatured && !hasProducts,
        'home__block--first': hasFeatured && !hasProducts,
        last: true
      }"
    />
  </div>
</template>

<script>
import PhotoSlideContainer from 'client/components/home/photo-slide.vue';
import ShowcaseContainer from 'client/components/products/showcase.vue';
import CategoryGridContainer from 'client/components/home/category-grid.vue';
import InstagramGridContainer from 'client/components/home/instagram-grid.vue';

import store from 'client/store';

export default {
  components: {
    PhotoSlideContainer,
    ShowcaseContainer,
    CategoryGridContainer,
    InstagramGridContainer,
  },
  computed: {
    lastReleases() {
      const items = [];
      Object.assign(items, this.$store.getters['product/items']);

      return items
        .sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
        .slice(0, 8);
    },
    lastSales() {
      const items = [];
      Object.assign(items, this.$store.getters['product/items']);

      return items
        .filter(({ discount }) => discount > 0)
        .sort((a, b) => b.discount - a.discount)
        .slice(0, 8);
    },
    hasFeatured() {
      return (
        this.$store.getters['featured/items'].filter(
          (item) => item.visible === true,
        ).length > 0
      );
    },
    hasProducts() {
      return this.$store.getters['product/itemsCount'] > 0;
    },
    hasCategories() {
      return (
        this.$store.getters['category/items'].filter(
          (category) => category.image && typeof category.image === 'string',
        ).length > 0
      );
    },
  },
};
</script>

<style scoped src="./home.css"></style>
