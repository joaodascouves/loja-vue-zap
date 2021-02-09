<template>
  <div class="list-container">
    <div class="list" v-if="$slots.default">
      <div class="list__label">
        <span class="list__label__item">Produto</span>
        <span class="list__label__item">Preço</span>
        <span class="list__label__item">Quantidade</span>
        <span class="list__label__item">Total</span>
      </div>
      <slot></slot>
    </div>
    <div class="content-centered empty-cart" v-else>
      <div class="empty-cart__message">Seu carrinho está vazio.</div>
      <div>
        <router-link to="/products">
          Clique aqui para adicionar itens
        </router-link>
      </div>
    </div>
    <div class="summary" v-if="$slots.default">
      <div class="summary__right">
        <!-- <coupon-container /> -->

        <div class="summary__subtotal">
          <span>Subtotal: </span>
          <span>{{ currencyFormat(computedSubtotal) }}</span>
        </div>
        <div class="summary__savings">
          <span>Economia feita: </span>
          <span
            >-{{ currencyFormat($store.getters["cart/totalSavings"]) }}</span
          >
        </div>
        <!-- <div
                    class="summary__savings"
                    v-if="currentCoupon.discount"
                >
                    <span>Cupom de desconto: </span>
                    <span>-{{ currentCoupon.discount }}%</span>
                </div> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    currentCoupon() {
      return this.$store.getters['discount/item'];
    },
  },
};
</script>

<style scoped src="./body.css"></style>
