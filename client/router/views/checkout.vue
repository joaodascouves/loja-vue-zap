<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="header2">
        Etapa de pagamento
      </div>
    </template>
    <template v-slot:content>
      <grid-container>
        <review-box />
        <personal-data-box />
        <shipment-box />
        <payment-box />
      </grid-container>
    </template>
  </fullpage-container>
</template>

<script>
import * as FullpageComponents from 'client/components/_fullpage';
import Checkout from './checkout';

import ReviewBox from './checkout/review.vue';
import PersonalDataBox from './checkout/personal-data.vue';
import ShipmentBox from './checkout/shipment.vue';
import PaymentBox from './checkout/payment.vue';

export default {
  extends: Checkout,

  components: {
    ...FullpageComponents,
    ReviewBox,
    PersonalDataBox,
    ShipmentBox,
    PaymentBox,
  },
};
</script>

<style scoped src="./checkout.css"></style>
