<template>
  <form>
    <shipment-services-container />
    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveShipmentServices"
    />
  </form>
</template>

<script>
import ShipmentServicesContainer from 'backend/components/shipment-services.vue';

export default {
  components: {
    ShipmentServicesContainer,
  },
  methods: {
    saveShipmentServices() {
      const shipmentServices = this.$store.getters['client/shipmentServices'];
      this.$store.dispatch('client/save', { shipmentServices });
    },
  },
};
</script>
