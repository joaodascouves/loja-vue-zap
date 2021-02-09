<template>
  <list-body-container context="user">
    <list-item-container
      v-for="(item, index) in $store.getters['user/filtered']"
      :key="`user-${index}`"
    >
      <template v-slot:info>
        <div>
          <span>Nome completo</span>
          <span>{{ item.name }}</span>
        </div>
        <div>
          <span>Data do cadastro</span>
          <span>{{ localDateFormat(item.created_at) }}</span>
        </div>
      </template>
      <template v-slot:options>
        <div class="option" @click="modifyItem({ user: item })">
          Visualizar
        </div>
        <div class="option" @click="removeItem({ user: { _id: item._id } })">
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
    if (store.getters['user/itemsCount'] === 0) {
      await store.dispatch('user/getAll');
    }

    next();
  },
};
</script>
