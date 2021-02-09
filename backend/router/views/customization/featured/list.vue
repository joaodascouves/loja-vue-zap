<template>
  <list-body-container context="featured">
    <list-item-container
      v-for="(item, index) in $store.getters['featured/filtered']"
      :key="`featured-${index}`"
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
          <span>Visível</span>
          <span>{{ item.visible ? "Sim" : "Não" }}</span>
        </div>
      </template>
      <template v-slot:options>
        <div class="option" @click="modifyItem({ featured: item })">
          Editar
        </div>
        <div
          class="option"
          @click="removeItem({ featured: { _id: item._id } })"
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
    if (store.getters['featured/itemsCount'] === 0) {
      await store.dispatch('featured/adminGetAll');
    }

    next();
  },
};
</script>
