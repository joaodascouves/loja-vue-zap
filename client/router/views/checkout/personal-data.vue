<template>
  <grid-box-container title="Dados de contato e informações">
    <template v-slot:content>
      <div :class="{ hidden: $store.getters['user/userExists'] }">
        <form-model
          :class="{
            'form-model': true,
            'form-model--personal-data': true,
            'form-model--blocked': $store.getters['user/isLoading'] === true,
          }"
          :model="personalModel"
          :data="user"
          :key="`personal-form1-${user._id}-${user.phone}`"
          @change="infoChanged"
        >
          <label>
            <div
              class="form-model__label form-model__label--optional form-model--personal-data__details"
            >
              Detalhes do pedido e instruções de entrega
            </div>
            <textarea
              class="form-model__textarea form-model--personal-data__details__textarea"
              placeholder="Exemplo: quero que seja embrulhado para presente, e que o entregador seja discreto na entrega"
            ></textarea>
          </label>
        </form-model>
      </div>
      <div v-show="$store.getters['user/userExists'] === true">
        <div class="notice">
          O telefone ou e-mail já encontra-se cadastrado no site. Por favor, insira sua senha.
        </div>
        <form-model
          :class="{
            'form-model': true,
            'form-model--blocked': $store.getters['user/isLoading'] === true,
          }"
          :model="signinModel"
          :data="$store.getters['user/pair']"
          :key="`personal-form2-${$store.getters['user/pair'].email}`"
        />

        <small class="soft message" v-if="$store.getters['user/anyMessage']">
          {{ $store.getters['user/anyMessage'] }}
        </small>

        <button-base title="Entrar" padding=".3em 1em" @click="signin" />
        <button-base title="Usar outro telefone" padding=".3em 1em" @click="changePhone" />
      </div>
    </template>
  </grid-box-container>
</template>

<script>
import signinModel from 'client/models/signinModel';
import Checkout from './index';

export default {
  extends: Checkout,
  data() {
    return {
      signinModel,
      createAccount: false,
    };
  },
  methods: {
    infoChanged({ target: { name, value, checked } }) {
      if (name === 'createAccount') {
        this.createAccount = checked;
      }
      // prettier-ignore
      if (
        ['phone', 'email'].includes(name)
            && !window._isLoggedIn()
        && this.$store.getters['user/userExists'] !== true
        && this.$store.getters['user/isLoading'] === false
        && value
        && value.length > 0
      ) {
        this.$store
          .dispatch('user/userExists', {
            [name]: value,
          })
          .then(() => {
            this.$store.dispatch('user/setPair', {
              email: value,
            });
          });
      }
    },
    signin() {
      const pair = this.$store.getters['user/pair'];
      this.$store.dispatch('user/auth', pair).then((result) => {
        this.$store.dispatch('user/clearUserExists');
      });
    },

    changePhone() {
      this.$store.dispatch('user/logout');
      this.$store.dispatch('user/clearUserExists');
    },
  },
};
</script>

<style scoped src="./personal-data.css"></style>
