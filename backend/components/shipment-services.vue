<template>
  <div class="options">
    <button-base
      title="Adicionar serviço"
      bstyle="padded-1 margin-2"

      @click="addShipmentService"
    />
    <div class="options__list">
      <div
        class="options__item"
        v-for="(service, index) in $store.getters['client/shipmentServices']"
        :key="`shipment-service-${index}`"
      >
        <form-model
          class="form-model"
          :model="{
            '': {
              name: {
                type: 'text',
                label: 'Nome',
                required: true,

                width: '50%'
              },
              baseCost: {
                type: 'number',
                label: 'Custo base',
                required: true,
              },
              local: {
                type: 'checkbox',
                required: true,
                values: {
                  true: 'Local'
                }
              },
              nonLocal: {
                type: 'checkbox',
                required: true,
                values: {
                  true: 'Outras cidades'
                }
              }
            }
          }"

          :data="service"
        />

        <i
          class="options__remove fa fa-times"
          @click="removeShipmentService(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addShipmentService() {
      this.$store.dispatch('client/addShipmentService');
    },
    removeShipmentService(index) {
      this.$store.dispatch('client/removeShipmentService', index);
    },
  },
};
</script>

<style scoped src="./_options.css"></style>
