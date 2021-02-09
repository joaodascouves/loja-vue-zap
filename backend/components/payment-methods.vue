<template>
  <div class="options">
    <button-base
      title="Adicionar método"
      bstyle="padded-1 margin-2"

      @click="addPaymentMethod"
    />
    <div class="options__list">
      <div
        class="options__item"
        v-for="(method, index) in $store.getters['client/paymentMethods']"
        :key="`method-${index}`"
      >
        <!-- <label class="options__label options__label--name">
          <div>Nome</div>
          <input type="text" v-model="method.name" />
        </label> -->

        <form-model
          :model="{
            '': {
              name: {
                type: 'text',
                label: 'Nome',
                required: true,
              },
              baseCost: {
                type: 'number',
                label: 'Custo base (R$)',
                required: true,

                width: '50%'
              },
              tax: {
                type: 'number',
                label: 'Taxa sobre o total (%)',
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

          :data="method"
        />

        <i
          class="options__remove fa fa-times"
          @click="removePaymentMethod(index)"
        />

        <!-- <label class="options__label options__label--number">
          <div>Custo base</div>
          <input type="number" v-model="method.baseCost" />
        </label>

        <label
          class="options__label options__label--number options__label--margin-bottom"
        >
          <div>Taxa sobre o total</div>
          <input type="number" v-model="method.tax" />
        </label>

        <label class="options__label">
          <input type="checkbox" v-model="method.local" />
          <span>Local</span>
        </label>

        <label class="options__label">
          <input type="checkbox" v-model="method.nonLocal" />
          <span>Outras cidades</span>
        </label> -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    addPaymentMethod() {
      this.$store.dispatch('client/addPaymentMethod');
    },
    removePaymentMethod(index) {
      this.$store.dispatch('client/removePaymentMethod', index);
    },
  },
};
</script>

<style scoped src="./_options.css"></style>
