<template>
  <list-body-container context="order">
    <list-item-container
      v-for="(item, index) in $store.getters['order/filtered']"
      :key="`order-${index}`"
    >
      <template v-slot:thumb>
        <image-container :src="itemImage(item)" />
      </template>
      <template v-slot:info>
        <div>
          <span>Status</span>
          <span>{{ item.status }}</span>
        </div>
        <div>
          <span>Total</span>
          <span>{{ currencyFormat(item.cart.totalAmount) }}</span>
        </div>
        <div v-if="item.customer">
          <span>Cliente</span>
          <span>{{ item.customer.name }}</span>
        </div>
        <div v-if="item.shipment.location">
          <span>Cidade</span>
          <span
            >{{ item.shipment.location.city }}/{{
              item.shipment.location.state
            }}</span
          >
        </div>
      </template>
      <template v-slot:options>
        <div class="option" @click="modifyItem({ order: item })">
          Visualizar
        </div>
        <div
          class="option"
          @click="
            removeItem({
              order: {
                _id: item._id,
                cart: {
                  _id: item.cart._id
                }
              }
            })
          "
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

  methods: {
    itemImage(item) {
      const product = item.cart.items.find((item) => !!item.item);

      return product ? product.item.image : undefined;
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (store.getters['order/itemsCount'] === 0) {
      await store.dispatch('order/getAll');
    }

    next();
  },
};
</script>
