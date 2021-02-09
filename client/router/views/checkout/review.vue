<template>
  <grid-box-container class="box--review" title="Revisão" flexBasis="25%">
    <template v-slot:content>
      <div class="cart">
        <div
          class="cart__item"
          v-for="(item, index) in $store.getters['cart/items']"
          :key="`cartitem-${index}`"
        >
          <div class="cart__item__float-left">
            <div class="cart__item__image">
              <image-container :src="item.image" />
            </div>
          </div>
          <div>
            <div class="cart__item__title">{{ item.title }}</div>
            <div class="cart__item__price">
              {{ currencyFormat(item.effectivePrice) }}
            </div>
            <div
              class="cart__item__variation"
              v-for="(variation, index) in item.variations.filter(
                ({ selected }) => !!selected
              )"
              :key="`variation-${index}`"
            >
              <span>{{ variation.name }}</span>
              <span>{{ variation.selected }}</span>
            </div>

            <div class="cart__item__total">
              <span>Total: </span>
              <span>{{
                currencyFormat(item.effectivePrice * item.quantity)
              }}</span>
            </div>

            <quantity-container
              class="cart__item__quantity"
              :item="item"
              :index="index"
            />
          </div>
        </div>
      </div>
    </template>
    <template v-slot:bottom>
      <div class="cart__summary">
        <div class="cart__summary__subtotal">
          <i class="cart__summary__icon fas fa-dollar-sign" />
          <span>Subtotal: </span>
          <span>{{ currencyFormat(computedSubtotal) }}</span>
        </div>
      </div>
    </template>
  </grid-box-container>
</template>

<script>
import QuantityContainer from 'client/components/cart/quantity.vue';
import Checkout from './index';

export default {
  extends: Checkout,
  components: {
    QuantityContainer,
  },
};
</script>

<style scoped src="./review.css"></style>
