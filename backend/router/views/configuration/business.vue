<template>
  <form>
    <div class="version">
      <span>Versão </span>
      <span>{{ business.version }}</span>
    </div>

    <form-model
      :model="businessModel"
      :data="business"
      :key="`business-${business.updated_at}`"
    />

    <label>
      <div>Logotipo</div>
      <upload-container
        :current="business.logo"
        @fileChanged="business.file = $event"
      />
    </label>

    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="$store.dispatch('client/save', business)"
    />
  </form>
</template>

<script>
import UploadContainer from 'backend/components/utils/upload.vue';
import businessModel from 'backend/models/businessModel';

export default {
  components: {
    UploadContainer,
  },
  data() {
    return {
      businessModel,
    };
  },
  computed: {
    business() {
      return this.$store.getters['client/business'];
    },
  },
};
</script>

<style scoped src="./business.css"></style>
