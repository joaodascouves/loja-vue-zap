<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="header2">
        Acompanhamento do pedido
      </div>
    </template>
    <template v-slot:content>
      <grid-container justifyContent="flex-start">
        <grid-box-container
          :title="`Detalhes da ordem ${order._id}`"
          maxWidth="50em"
        >
          <template v-slot:content>
            <div>
              <span>Status: </span>
              <span>{{ order.status }}</span>
            </div>
            <div>
              <span>Data de lançamento: </span>
              <span>{{ localDateFormat(order.created_at) }}</span>
            </div>
            <div>
              <span>Última atualização: </span>
              <span>{{ localDateFormat(order.updated_at) }}</span>
            </div>
            <div v-if="order.shipment.trackNumber">
              <span>Código de rastreio: </span>
              <span>{{ order.shipment.trackNumber }}</span>
            </div>

            <div class="section--margin clickable soft" @click="viewOnPanel">
              Ver no painel
            </div>
          </template>
        </grid-box-container>
      </grid-container>
    </template>
  </fullpage-container>
</template>

<script>
import * as FullpageComponents from 'client/components/_fullpage';
import * as GridComponents from 'client/components/_grid';

import store from 'client/store';

export default {
  components: {
    ...FullpageComponents,
    ...GridComponents,
  },
  computed: {
    order() {
      return this.$store.getters['order/item'];
    },
  },
  methods: {
    viewOnPanel() {
      const link = `/admin/order/modify/${this.order._id}`;
      window.location.replace(link);
    },
  },
  async beforeRouteEnter(to, from, next) {
    await store.dispatch('order/get', { _id: to.params.id });
    next();
  },
};
</script>

<style scoped src="./order.css"></style>
