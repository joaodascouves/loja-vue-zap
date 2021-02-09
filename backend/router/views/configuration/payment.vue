<template>
  <form>
    <payment-methods-container />
    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="savePaymentMethods"
    />
  </form>
</template>

<script>
import PaymentMethodsContainer from 'backend/components/payment-methods.vue';

export default {
  components: {
    PaymentMethodsContainer,
  },
  methods: {
    savePaymentMethods() {
      const paymentMethods = this.$store.getters['client/paymentMethods'];
      this.$store.dispatch('client/save', { paymentMethods });
    },
  },
};
</script>
