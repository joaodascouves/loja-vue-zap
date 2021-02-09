<template>
  <div class="centered-fullpage">
    <form>
      <div class="header2">
        Autenticação
      </div>
      <form-model :model="signinModel" :data="pair" />

      <button-base
        title="Entrar"
        bstyle="padded-1"
        @click="auth"
      />
    </form>
  </div>
</template>

<script>
import formModel from '../../../../shared/components/form-model.vue';

export default {
  components: { formModel },
  data() {
    return {
      signinModel: {
        '': {
          email: {
            type: 'text',
            label: 'E-mail ou telefone',
            required: true,
          },
          password: {
            type: 'password',
            label: 'Senha',
            required: true,
          },
        },
      },
    };
  },
  computed: {
    pair() {
      return this.$store.getters['user/pair'];
    },
  },
  methods: {
    auth() {
      this.$store
        .dispatch('user/auth', { ...this.pair, admin: true })
        .then(() => this.$router.push({ path: '/' }));
    },
  },
};
</script>

<style scoped src="./signin.css"></style>
