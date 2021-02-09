<template>
  <form>
    <form-model :model="themeModel" :data="business" />
    <button-base title="Salvar" bstyle="padded-1" @click="saveTheme" />
  </form>
</template>

<script>
import themeModel from 'backend/models/themeModel';

export default {
  data() {
    return {
      themeModel,
    };
  },
  computed: {
    business() {
      return this.$store.getters['client/business'];
    },
  },
  methods: {
    saveTheme() {
      const { theme } = this.business;
      this.$store.dispatch('client/save', { theme });
    },
  },
};
</script>
