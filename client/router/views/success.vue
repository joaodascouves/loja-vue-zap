<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="padded header2">
        Obrigado por comprar conosco
      </div>
    </template>
    <template v-slot:content>
      <div class="padded">
        <p class="easy-text">
          Seu pedido está sendo processado com ID
          <span>{{ order._id }}.</span>
        </p>
        <p class="easy-text">
          Por gentileza, clique no botão abaixo para finalizar o seu
          atendimento. É necessário ter o aplicativo WhatsApp instalado, e, no
          caso do acesso ser feito por meio de computador, estar conectado ao
          WhatsApp Web.
        </p>

        <button-base
          title="Finalizar atendimento"
          margin="3em 0 0 0"
          padding=".6em 2.5em"
          @click="finishOrder"
        />
      </div>
    </template>
  </fullpage-container>
</template>

<script>
import * as FullpageComponents from 'client/components/_fullpage';
import store from 'client/store';

import { startWhatsAppChat } from 'shared/utils';

export default {
  components: {
    ...FullpageComponents,
  },
  computed: {
    order() {
      return this.$store.getters['order/item'];
    },
    currentUser() {
      return this.$store.getters['user/currentUser'];
    },
  },
  methods: {
    finishOrder() {
      let { phone } = this.$store.getters['client/business'];
      let message = '';

      const orderLink = `${location.origin}/order/${this.order._id}`;

      phone = /^55/.test(phone) ? phone : `55${phone}`;

      message = `Olá. Meu nome é ${this.currentUser.name}.\n\n`;
      message += `Link para o meu pedido: ${orderLink}`;

      startWhatsAppChat({
        phone,
        message,
      });
    },
  },
  // beforeRouteEnter(to, from, next) {
  //   if (store.getters['order/item']._id) {
  //     next();
  //   } else {
  //     next({ path: '/' });
  //   }
  // },
};
</script>

<style scoped src="./success.css"></style>
