<template>
    <div class="calculator">
        <div class="calculator__text">Selecionar serviço de entrega</div>

        <select class="calculator__select" v-model="shipment">
            <option
                class="calculator__select__option"
                v-for="(service, index) in allServices"
                :key="`service-${index}`"

                :value="service._id"
            >
                {{ service.name }} ({{ currencyFormat(service.baseCost) }})
            </option>
        </select>
    </div>
</template>

<script>
export default {
  data() {
    return {
      shipment: '',
    };
  },
  methods: {
    getServices(local) {
      return Object.values(this.$store.getters['client/shipmentServices']
        .filter((service) => service[local ? 'local' : 'nonLocal'] === true));
    },
  },
  computed: {
    localServices() {
      return this.getServices(true);
    },
    nonLocalServices() {
      return this.getServices(false);
    },
    allServices() {
      return [
        ...this.localServices,
        ...this.nonLocalServices,
      ];
    },
  },
  watch: {
    shipment: {
      immediate: false,
      handler(shipment) {
        this.$store.dispatch('order/selectShipmentService', shipment);
      },
    },
  },
};
</script>

<style scoped src="./shipment-calculator.css"></style>
