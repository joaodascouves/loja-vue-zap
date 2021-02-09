<template>
  <form>
    <div class="section" data-title="Informações">
      <form-model :model="categoryModel" :data="category" />

      <label>
        <div class="optional">Imagem</div>
        <upload-container
          :current="category.image"
          @fileChanged="category.file = $event"
          @fileRemoved="
            removeImage({
              category: {
                remove: category.image,
                ...category
              }
            })
          "
        />
      </label>
    </div>

    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveItem({ category })"
    />
  </form>
</template>

<script>
import UploadContainer from 'backend/components/utils/upload.vue';
import store from 'backend/store';

import categoryModel from 'backend/models/categoryModel';

export default {
  components: {
    UploadContainer,
  },
  data() {
    return {
      categoryModel,
    };
  },
  computed: {
    category() {
      return {
        ...this.$store.getters['category/item'],
      };
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (to.params.slug) {
      if (!store.getters['category/item']._id) {
        await store.dispatch('category/get', { slug: to.params.slug });
      }
    }

    next();
  },
};
</script>
