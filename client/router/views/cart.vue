<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="header2">
        Carrinho de compras
      </div>
    </template>
    <template v-slot:content>
      <cart-body-container>
        <cart-item-container
          v-for="(item, index) in $store.getters['cart/items']"
          :key="`cartitem-${index}`"
          :item="item"
          :index="index"
        >
        </cart-item-container>
      </cart-body-container>

      <div class="options" v-if="$store.getters['cart/itemsCount'] > 0">
        <button-base
          class="options__button"
          title="Continuar comprando"
          @click="$router.push({ path: '/' })"
        />
        <button-base
          class="options__button"
          title="Seguir para o pagamento"
          @click="$router.push({ path: '/checkout' })"
        />
      </div>
    </template>
  </fullpage-container>
</template>

<script>
import * as FullpageComponents from 'client/components/_fullpage';
import * as CartComponents from 'client/components/cart';

export default {
  components: {
    ...FullpageComponents,
    ...CartComponents,
  },
};
</script>

<style scoped src="./cart.css"></style>
