<template>
  <form>
    <form-model :model="textSectionsModel" :data="business" />
    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveTextSections"
    />
  </form>
</template>

<script>
import textSectionsModel from 'backend/models/textSectionsModel';

export default {
  data() {
    return {
      textSectionsModel,
    };
  },
  computed: {
    business() {
      return this.$store.getters['client/business'];
    },
  },
  methods: {
    saveTextSections() {
      const { textSections } = this.business;
      this.$store.dispatch('client/save', { textSections });
    },
  },
};
</script>
