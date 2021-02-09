<template>
  <form>
    <form-model :model="featuredModel" :data="featured" />

    <label>
      <div>Imagem</div>
      <upload-container
        :current="featured.image"
        @fileChanged="featured.file = $event"
        @fileRemoved="
          removeImage({
            featured: {
              remove: featured.image,
              ...featured
            }
          })
        "
      />
    </label>

    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveItem({ featured })"
    />
  </form>
</template>

<script>
import UploadContainer from 'backend/components/utils/upload.vue';
import featuredModel from 'backend/models/featuredModel';

import store from 'backend/store';

export default {
  components: {
    UploadContainer,
  },
  data() {
    return {
      featuredModel,
    };
  },
  computed: {
    featured() {
      return this.$store.getters['featured/item'];
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (to.params.slug) {
      if (!store.getters['featured/item']._id) {
        await store.dispatch('featured/get', { slug: to.params.slug });
      }
    }

    next();
  },
};
</script>
