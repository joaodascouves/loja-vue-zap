<template>
  <div class="item-container">
    <i
      class="fa fa-times remove"
      @click="$store.dispatch('cart/removeItem', index)"
    />
    <div class="item">
      <div class="item__float-left">
        <div class="item__thumb clickable">
          <img :src="item.image" @click="viewItem({ product: item })" />
        </div>
      </div>

      <div class="item__float-right">
        <div class="item__description">
          <div class="item__title">
            {{ item.title }}
          </div>
          <div
            class="item__variation"
            v-for="(variation, index) in formatedVariations"
            :key="`variation-${index}`"
          >
            <span>{{ variation.name }}: </span>
            <span>{{ variation.selected }}</span>
          </div>
        </div>
        <div class="item__price">
          <div class="item__effective-price">
            {{ currencyFormat(item.effectivePrice) }}
          </div>
          <div class="item__original-price" v-if="item.discount > 0">
            {{ currencyFormat(item.price) }}
          </div>
        </div>
        <quantity-container
          class="item__quantity"
          :item="item"
          :index="index"
        />
        <div class="item__total">
          {{ currencyFormat(item.effectivePrice * item.quantity) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QuantityContainer from './quantity.vue';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  components: {
    QuantityContainer,
  },
  computed: {
    formatedVariations() {
      return this.item.variations
        .filter(({ selected }) => selected)
        .map(({ name, selected }) => ({ name, selected }));
    },
  },
};
</script>

<style scoped src="./item.css"></style>
