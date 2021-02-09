<template>
  <grid-box-container title="Forma de entrega" bottomPadding="0">
    <template v-slot:content>
      <!-- <div class="shipment__type">
                            <label
                                class="label shipment__type__label"
                                v-if="hasShipmentServices(true)"
                            >
                                <input
                                    name="localOrder"
                                    type="radio"
                                    value="true"

                                    v-model="localOrder"
                                />
                                <span>Sou de {{ $store.getters['client/business'].city }}</span>
                            </label>
                            <label
                                class="label shipment__type__label"
                                v-if="hasShipmentServices(false)"
                            >
                                <input
                                    name="localOrder"
                                    type="radio"
                                    value="false"

                                    v-model="localOrder"
                                />
                                <span>Sou de outra cidade</span>
                            </label>
                        </div> -->

      <form-model
        :class="{
          'form-model': true,
          'form-model--blocked': $store.getters['user/isLoading'] == true
        }"
        :model="shipmentModel"
        :data="user"
        :key="`shipment-form1-${user._id}-${$store.getters['user/zipcode']}`"
      />
      <!-- <form-model
        class="form-model"
        :model="shipmentServiceModel"
        :data="shipment"
      /> -->

    </template>
    <template v-slot:bottom>
      <shipment-calculator-container />
    </template>
    <!-- <template v-slot:bottom>
      <div>
        <span>Custo de envio: </span>
        <span>{{ currencyFormat(selectedShipmentService.baseCost) }}</span>
      </div>
    </template> -->
  </grid-box-container>
</template>

<script>
import ShipmentCalculatorContainer from 'client/components/utils/shipment-calculator.vue';
import Checkout from './index';

export default {
  extends: Checkout,
  components: {
    ShipmentCalculatorContainer,
  },
  // mounted() {
  //   this.$store.dispatch('order/selectShipmentService', this.shipment.service);
  // },
  computed: {
    zipcode() {
      return this.$store.getters['user/currentUser'].location.zipcode;
    },
  },
  watch: {
    zipcode(value) {
      this.$store.dispatch('user/fetchZipcode', value);
    },
    localOrder(value) {
      this.$store.dispatch('order/clearShipmentService');
      this.localPayment = this.isLocalPaymentPossible && value;
    },
    shipment: {
      deep: true,
      immediate: false,
      handler({ service }) {
        console.log(service);
        this.$store.dispatch('order/selectShipmentService', service);
      },
    },
  },
};
</script>

<style scoped src="./shipment.css"></style>
