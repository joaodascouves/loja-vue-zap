<template>
  <form>
    <form-model :model="userModel" :data="user" />
    <button-base
      title="Salvar"
      bstyle="padded-1 margin-1"
      @click="saveItem({ user })"
    />
  </form>
</template>

<script>
import userModel from 'backend/models/userModel';
import store from 'backend/store';

export default {
  data() {
    return {
      userModel,
    };
  },
  computed: {
    user() {
      return this.$store.getters['user/item'];
    },
  },

  async beforeRouteEnter(to, from, next) {
    if (to.params.slug) {
      if (!store.getters['user/item']._id) {
        await store.dispatch('user/get', { slug: to.params.slug });
      }
    }

    next();
  },
};
</script>
