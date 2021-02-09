<template>
  <div class="discount">
    <form>
      <form-model
        class="form-model--discount"
        :model="discountModel"
        :data="discount"
      />
      <button-base
        title="Salvar"
        bstyle="padded-1 margin-1"
        @click="saveItem({ discount })"
      />
    </form>

    <list-body-container class="orders__list">
      <list-item-container
        class="orders__list__item"
        v-for="(order, index) in discount.usedByOrders"
        :key="`order-${index}`"
      >
        <template v-slot:info>
          <div>
            <span>Cliente</span>
            <span>{{ order.customer.name }}</span>
          </div>
          <div>
            <span>Total</span>
            <span>{{ currencyFormat(order.cart.totalAmount) }}</span>
          </div>
          <div>
            <span>Status</span>
            <span>{{ order.status }}</span>
          </div>
        </template>

        <template v-slot:options>
          <button-base title="Ver pedido" @click="modifyOrder(order)" />
        </template>
      </list-item-container>
    </list-body-container>
  </div>
</template>

<script>
import * as ListComponents from 'backend/components/_list';

import discountModel from 'backend/models/discountModel';
import store from 'backend/store';
import base from '../../../../../client/router/views/customer/secure/base.vue';

export default {
  components: {
    ...ListComponents,
  },
  data() {
    return {
      discountModel,
    };
  },
  computed: {
    discount() {
      return this.$store.getters['discount/item'];
    },
  },
  methods: {
    modifyOrder(order) {
      this.$store.dispatch('order/clear');
      this.$router.push(`/order/modify/${order._id}`);
    },
  },
  async beforeRouteEnter(to, from, next) {
    if (to.params.id) {
      if (!store.getters['discount/item']._id) {
        await store.dispatch('discount/adminGet', { _id: to.params.id });
      }
    }

    next();
  },
};
</script>

<style scoped src="./modify.css"></style>
