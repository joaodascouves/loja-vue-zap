<template>
  <div class="options">
    <button-base
      title="Adicionar variação"
      bstyle="padded-1 margin-2"

      @click="addVariation"
    />
    <div class="options__list">
      <div
        class="options__item"
        v-for="(variation, index) in $store.getters['client/pureVariations']"
        :key="`variation-${index}`"
      >
        <!-- <label class="options__field options__field--name">
          <div>Nome</div>
          <input type="text" v-model="variation.name" />
        </label>
        <label class="options__field options__field--value">
          <div>Valor</div>
          <input type="text" v-model="variation.value" />
        </label> -->

        <form-model
          :model="{
            '': {
              name: {
                type: 'text',
                label: 'Nome',
                required: true,

                width: '50%'
              },
              value: {
                type: 'text',
                label: 'Valores',
                required: true,

                hint: 'Separados por vírgula'
              }
            }
          }"

          :data="variation"
        />

        <i
          class="options__remove clickable fa fa-times"
          @click="removeVariation(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: String,
      required: true,
    },
  },
  methods: {
    addVariation() {
      this.$store.dispatch(`${this.context}/addVariation`);
    },
    removeVariation(index) {
      this.$store.dispatch(`${this.context}/removeVariation`, index);
    },
  },
};
</script>

<style scoped src="./_options.css"></style>
