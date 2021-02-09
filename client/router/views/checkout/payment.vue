<template>
  <grid-box-container title="Forma de pagamento e confirmação" bottomPadding="0">
    <template v-slot:content>
      <div class="payment__type">
        <label
          class="label payment__type__label"
          v-if="localOrder === 'true' && hasPaymentMethods('local')"
        >
          <input
            name="localPayment"
            type="radio"
            value="true"
            v-model="localPayment"
          />
          <span>Pagar na retirada ou na entrega</span>
        </label>
        <label
          class="label payment__type__label"
          v-if="hasPaymentMethods('nonLocal')"
        >
          <input
            name="localPayment"
            type="radio"
            value="false"
            v-model="localPayment"
          />
          <span>Pagar pelo site</span>
        </label>
      </div>

      <form-model
        class="form-model form-model--payment"
        :model="paymentModel"
        :data="$store.getters['order/item'].payment"
        :key="`payment-form-${localOrder}`"
      />
    </template>
    <template v-slot:bottom>
      <coupon-container class="payment__coupon" />

      <div class="padded-bottom">
        <div class="payment__summary">
        <div>
          <span>Pedido: </span>
          <span>{{ currencyFormat(computedSubtotal) }}</span>
        </div>
        <div>
          <span>Custo de envio: </span>
          <span>{{ currencyFormat(selectedShipmentService.baseCost) }}</span>
        </div>
        <div class="payment__total">
          <span>Total: </span>
          <span>{{
            currencyFormat(computedSubtotal + selectedShipmentService.baseCost)
          }}</span>
        </div>
      </div>
      <div class="payment__float-bottom-right">
        <button-base
          class="payment__confirm-button"

          title="Confirmar pedido"
          margin="2em 0 0 0"
          v-if="$store.getters['cart/itemsCount'] > 0"
          @click="confirmOrder"
        />
        <small
          class="soft message"
          v-if="
            $store.getters['cart/anyMessage'] &&
              !$store.getters['cart/error'].ref
          "
        >
          {{ $store.getters["cart/anyMessage"] }}
        </small>
        <small class="soft message" v-if="$store.getters['order/anyMessage']">
          {{ $store.getters["order/anyMessage"] }}
        </small>
      </div>
      </div>
    </template>
  </grid-box-container>
</template>

<script>
import CouponContainer from 'client/components/cart/coupon.vue';
import Checkout from './index';

export default {
  extends: Checkout,

  components: {
    CouponContainer,
  },

  methods: {
    confirmOrder() {
      this.$store
        .dispatch('order/save', {
          items: this.$store.getters['cart/items'],
        })
        .then(() => {
          this.$store.dispatch('cart/clearItems');
          this.$store.dispatch('discount/clear');

          this.$router.push({ path: '/success' });
        });
    },
  },
};
</script>

<style scoped src="./payment.css"></style>
