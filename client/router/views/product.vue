<template>
  <div class="centered product-page">
    <div class="product">
      <div class="product__image-section">
        <carousel
          class="product__carousel"
          :per-page="1"
          :center-mode="true"
          :pagination-position="'bottom-overlay'"
          :pagination-size="15"
        >
          <slide>
            <image-container class="product__image" :src="product.image" />
          </slide>
          <slide
            v-for="(image, index) in product.images"
            :key="`image-${index}`"
          >
            <image-container class="product__image" :src="image" />
          </slide>
        </carousel>
      </div>

      <div class="product__detail-section" v-if="product._id">
        <div class="product__title">
          <span>{{ product.title }}</span>
          <span v-if="product.stock === 0">
            (indisponível)
          </span>
        </div>
        <div class="product__description whitespace-preline">
          {{ product.description }}
        </div>

        <div class="product__details">
          <div class="product__categories">
            <span>Categorias: </span>
            <span
              v-for="(category, index) in product.categories.filter(
                category => !!category
              )"
              :key="`category-${index}`"
            >
              <router-link :to="`/products/all?category=${category.slug}`">
                {{ category.title }}
              </router-link>
            </span>
          </div>
          <div v-if="product.stock">
            <span>Peças em estoque: </span>
            <span>{{ product.stock }}</span>
          </div>
          <div v-if="product.sku">
            <span>SKU: </span>
            <span>{{ product.sku }}</span>
          </div>
        </div>

        <div class="product__attributes">
          <div class="product__attributes__item" v-if="product.freeShipping === true">
            <i class="product__attributes__icon fa fa-paper-plane" />
            <div class="product__attributes__name">Frete grátis</div>
          </div>
          <div class="product__attributes__item" v-if="product.underRequest === true">
            <i class="product__attributes__icon fas fa-shipping-fast" />
            <div class="product__attributes__name">Sob encomenda</div>
          </div>
        </div>

        <div class="product__prices">
          <div class="product__price">
            {{ currencyFormat(product.effectivePrice) }}
          </div>

          <div
            class="product__original-price"
            v-if="product.price !== product.effectivePrice"
          >
            {{ currencyFormat(product.price) }}
          </div>
        </div>

        <div class="product__bottom">
          <div class="product__variations">
            <label
              class="product__variations__variation"
              v-for="(variation, index) in product.variations.filter(
                ({ value }) => value.length > 0
              )"
              :key="`variation-${index}`"
            >
              <div>{{ variation.name }}</div>
              <select
                class="product__variation__select"
                :name="variation.name"
                @input="selectVariation"
              >
                <option
                  class="product__variation__option"
                  v-for="(option, oindex) in variation.value"
                  :key="`option-${oindex}`"
                  :value="option"
                >
                  {{ option }}
                </option>
              </select>
            </label>
          </div>

          <add-to-cart-button margin=".8em 0 .25em 0" padding=".6em 1.5em" />
          <!-- <go-to-checkout-button
                    padding=".6em 1.5em"
                /> -->
        </div>
      </div>
    </div>

    <related-container
      class="related"
      v-if="$store.getters['product/itemsCount'] > 1"
    />
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import RelatedContainer from 'client/components/products/related.vue';

import GoToCheckoutButton from 'client/components/buttons/go-to-checkout.vue';
import AddToCartButton from 'client/components/buttons/add-to-cart.vue';

import DiscountBarContainer from 'client/components/product/discount-bar.vue';

import { headTag } from 'shared/utils';
import store from 'client/store';

export default {
  components: {
    Carousel,
    Slide,
    RelatedContainer,
    GoToCheckoutButton,
    AddToCartButton,

    DiscountBarContainer,
  },
  data() {
    return {
      currentImage: { ...this.$store.getters['product/item'] }.image,
    };
  },
  mounted() {
    this.product.variations
      .filter(({ value }) => value.length > 0)
      .forEach(({ name, value }) => {
        this.$store.dispatch('product/selectVariation', {
          name,
          value: value[0],
        });
      });

    const { description, title } = this.product;

    // headTag('meta[name=description]', 'content', description && description.length > 5 ? description : title);
  },
  computed: {
    product() {
      const product = this.$store.getters['product/item'];

      return {
        ...product,
        sizes: product.sizes || [],
      };
    },
  },
  methods: {
    focusImage(image, index) {
      this.product.images[index] = this.currentImage;
      this.currentImage = image;
    },
    selectVariation({ target: { name, value } }) {
      this.$store.dispatch('product/selectVariation', { name, value });
    },
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters['product/item']._id === undefined) {
      store
        .dispatch('product/get', { slug: to.params.slug })
        .then(() => next());
    } else {
      next();
    }
  },
};
</script>

<style scoped src="./product.css"></style>
