<template>
  <div class="cart" @click="$router.push({ path: '/cart' })">
    <div>finalizar pedido</div>
    <i class="cart__icon fa fa-shopping-bag" />

    <span class="cart__quantity">
      <span>{{ $store.getters["cart/quantity"] }}</span>
      <span
        >{{ $store.getters["cart/quantity"] === 1 ? "item" : "items" }} no
        carrinho</span
      >
    </span>

    <i class="cart__separator fa fa-circle" />
    <span class="cart__amount">{{
      currencyFormat($store.getters["cart/totalAmount"])
    }}</span>
  </div>
</template>

<style scoped src="./cart-shortcut.css"></style>
