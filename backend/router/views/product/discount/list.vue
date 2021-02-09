<template>
  <list-body-container context="discount">
    <list-item-container
      v-for="(item, index) in $store.getters['discount/items']"
      :key="`discount-${index}`"
    >
      <template v-slot:thumb> </template>
      <template v-slot:info>
        <div>
          <span>Código</span>
          <span>{{ item.code }}</span>
        </div>
        <div>
          <span>Desconto</span>
          <span>{{ item.discount }}</span>
        </div>
        <div>
          <span>Valido até</span>
          <span>{{ localDateFormat(item.expirationDate) }}</span>
        </div>
        <div>
          <span>Usos</span>
          <span>{{ item.usedByOrders.length }}</span>
        </div>
      </template>
      <template v-slot:options>
        <div class="option" @click="modifyItem({ discount: item })">
          Editar
        </div>
        <div
          class="option"
          @click="removeItem({ discount: { _id: item._id } })"
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
    if (store.getters['discount/itemsCount'] === 0) {
      await store.dispatch('discount/getAll');
    }

    next();
  },
};
</script>
