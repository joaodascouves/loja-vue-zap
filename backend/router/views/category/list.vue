<template>
  <list-body-container context="category">
    <list-item-container
      v-for="(item, index) in $store.getters['category/filtered']"
      :key="`category-${index}`"
    >
      <template v-slot:thumb>
        <image-container :src="item.image" />
      </template>
      <template v-slot:info>
        <div>
          <span>Título</span>
          <span>{{ item.title }}</span>
        </div>
        <div>
          <span>Descrição</span>
          <span>{{ item.description }}</span>
        </div>
        <div>
          <span>Possui imagem</span>
          <span>{{ item.image ? "Sim" : "Não" }}</span>
        </div>
      </template>
      <template v-slot:options>
        <div class="option" @click="modifyItem({ category: item })">
          Editar
        </div>
        <div
          class="option"
          @click="removeItem({ category: { _id: item._id } })"
        >
          Remover
        </div>
      </template>
    </list-item-container>
  </list-body-container>
</template>

<script>
import * as ListComponents from 'backend/components/_list';
import store from 'backend/store';

import List from 'backend/components/_list/list';

export default {
  extends: List,
  components: {
    ...ListComponents,
  },

  async beforeRouteEnter(to, from, next) {
    if (store.getters['category/itemsCount'] === 0) {
      await store.dispatch('category/getAll');
    }

    next();
  },
};
</script>
