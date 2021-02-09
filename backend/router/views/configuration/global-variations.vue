<template>
  <form>
    <variations-container context="client" />
    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveVariations"
    />
  </form>
</template>

<script>
import VariationsContainer from 'backend/components/variations.vue';

export default {
  components: {
    VariationsContainer,
  },
  methods: {
    saveVariations() {
      const variations = this.$store.getters['client/variations'];
      this.$store.dispatch('client/save', { variations });
    },
  },
};
</script>
