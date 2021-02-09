<template>
  <div class="item box" v-if="product.item">
    <div class="item__float-left">
      <div class="item__image">
        <image-container :src="product.item.image" />
      </div>
    </div>

    <div class="item__title">
      <span>Título: </span>
      <span>{{ product.item.title }}</span>
    </div>
    <div class="item__variations">
      <div
        class="item__variation"
        v-for="(variation, index) in product.variations"
        :key="`variation-${index}`"
      >
        <span>{{ variation.name }}: </span>
        <span>{{ variation.selected }}</span>
      </div>
    </div>
    <div class="item__quantity">
      <span>Quantidade: </span>
      <span>{{ product.quantity }}</span>
    </div>
    <div class="item__stock">
      <span>Em estoque: </span>
      <span>{{ product.item.stock }}</span>
    </div>
    <div class="item__price">
      <span>Preço efetivo: </span>
      <span>{{ currencyFormat(product.item.effectivePrice) }}</span>
    </div>
    <div class="item__computed-price">
      <span>Total efetivo: </span>
      <span>{{
        currencyFormat(product.item.effectivePrice * product.quantity)
      }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped src="./item.css"></style>
