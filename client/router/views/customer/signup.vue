<template>
  <fullpage-container>
    <template v-slot:header>
      <div class="header2">
        Cadastro
      </div>
    </template>
    <template v-slot:content>
      <grid-container justifyContent="flex-start">
        <grid-box-container title="Cadastre-se" maxWidth="50em">
          <template v-slot:content>
            <form-model :model="signupModel" :data="signupUser" />

            <small
              class="soft message"
              v-if="$store.getters['user/anyMessage']"
            >
              {{ $store.getters["user/anyMessage"] }}
            </small>

            <button-base
              title="Cadastrar"
              margin="1.5em 0 0 0"
              padding=".6em 2em"
              @click="signup"
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

import signupModel from 'client/models/signupModel';
import base from './secure/base.vue';

export default {
  components: {
    ...FullpageComponents,
    ...GridComponents,
  },
  data() {
    return {
      signupModel,
      signupUser: {},
    };
  },
  methods: {
    signup() {
      this.$store.dispatch('user/save', this.signupUser).then(() => {
        this.$store.dispatch('user/spawnInfo', {
          message: 'Conta criada com sucesso',
        });

        this.$router.push({ path: '/customer/signin' });
      });
    },
  },
};
</script>

<style scoped src="./signup.css"></style>
