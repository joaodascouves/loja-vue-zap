<template>
  <button-base
    :margin="margin"
    :padding="padding"
    :disabled="disabled"
    icon="fas fa-shopping-bag"
    @click="addToCart"
  >
    <!-- <span class="fab fa-whatsapp" /> -->
    <span>Adicionar ao carrinho</span>
  </button-base>
</template>

<script>
import store from 'client/store';
import { addToCart } from './utils';

export default {
  props: {
    margin: {
      type: String,
      default: '0',
    },
    padding: {
      type: String,
      default: '0',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // addToCart() {
    //   const product = this.$store.getters['product/item'];

    //   if (product.sizes && product.sizes.length <= 1) {
    //     this.$store.dispatch('cart/addItem', product);
    //     return;
    //   }

    //   this.$store.dispatch('changePopup', {
    //     popup: {
    //       id: 'variation',
    //       title: 'Este item possui mais de uma variação',
    //       message: 'Para adicionar o item ao carrinho, escolha dentre uma das variações disponíveis abaixo.',
    //       component: 'product-variation-popup',
    //     },
    //   });
    // },
    addToCart,
  },
  // watch: {
  //   '$store.getters.popupAccepted': {
  //     deep: true,
  //     handler({ id }) {
  //       if (id !== 'variation') {
  //         return;
  //       }

  //       const product = store.getters['product/item'];
  //       if (!product.variation || Object.keys(product.variation).length === 0) {
  //         return;
  //       }

  //       store.dispatch('cart/addItem', product);
  //       store.dispatch('closePopup');

  //       store.commit('product/ITEM_GET', {
  //         ...product,
  //         variation: {},
  //       });

  //       this.$root.$emit('cartItemAdded', 1);
  //     },
  //   },
  // },
};
</script>
