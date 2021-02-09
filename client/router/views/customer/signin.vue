<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="header2">
        Área do cliente
      </div>
    </template>
    <template v-slot:content>
      <grid-container>
        <grid-box-container title="Entrar">
          <template v-slot:content>
            <form>
              <form-model :model="signinModel" :data="pair" />

              <small
                class="soft message"
                v-if="$store.getters['user/anyMessage']"
              >
                {{ $store.getters["user/anyMessage"] }}
              </small>

              <button-base
                title="Entrar"
                margin="1em 0 0 0"
                padding=".5em 2em"
                @click="signin"
              />
            </form>
          </template>
        </grid-box-container>

        <grid-box-container title="Cadastre-se">
          <template v-slot:content>
            <p class="soft">
              Cadastrando-se em nossa loja, você tem acesso a benefícios
              exclusivos, como por exemplo:
            </p>
            <ul>
              <li>Histórico de pedidos</li>
              <li>Participação em sorteios</li>
              <li>Ficar por dentro de descontos e novidades</li>
            </ul>
            <button-base
              title="Cadastrar"
              margin="1em  0 0 0"
              padding=".5em 2em"
              @click="$router.push({ path: `signup` })"
            />
          </template>
        </grid-box-container>
      </grid-container>
    </template>
  </fullpage-container>
</template>

<script>
import * as FullpageComponents from 'client/components/_fullpage';
import * as GridComponents from 'client/components/_grid';

import signinModel from 'client/models/signinModel';

export default {
  components: {
    ...FullpageComponents,
    ...GridComponents,
  },
  data() {
    return {
      signinModel,
    };
  },
  computed: {
    pair() {
      return this.$store.getters['user/pair'];
    },
  },
  methods: {
    signin() {
      this.$store.dispatch('user/auth', this.pair).then((result) => {
        this.$router.push({ path: '/customer/secure/me' });
      });
    },
  },

  beforeRouteEnter(to, from, next) {
    if (window._isLoggedIn()) {
      next({ path: '/customer/secure/me' });
    } else {
      next();
    }
  },
};
</script>

<style scoped src="./signin.css"></style>
