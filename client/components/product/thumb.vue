<template>
  <div class="product" @click="viewItem({ product })">
    <div class="product__image">
      <image-container
        :class="{ faded: product.stock === 0 }"
        :src="product.image"
        :alt="product.title"
      />

      <!-- <discount-bar-container :discount="product.discount" /> -->

      <div class="product__attributes">
        <div class="product__attributes__item" v-if="product.freeShipping === true">
          Frete grátis
        </div>
        <div class="product__attributes__item" v-if="product.discount > 0">
          {{ product.discount }}% off
        </div>
        <div class="product__attributes__item product__attributes__item--alt" v-if="product.underRequest === true">
          Sob encomenda
        </div>
      </div>
    </div>

    <div class="product__title">
      <span>{{ product.title }}</span>
      <span v-if="product.stock === 0">
        (indisponível)
      </span>
    </div>

    <div class="product__price">
      <span class="product__price__original" v-if="product.discount > 0">
        {{ currencyFormat(product.price) }}
      </span>
      <span class="product__price__effective">{{
        currencyFormat(product.effectivePrice)
      }}</span>
    </div>
  </div>
</template>

<script>
import DiscountBarContainer from './discount-bar.vue';

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  components: {
    DiscountBarContainer,
  },
};
</script>

<style scoped src="./thumb.css"></style>
