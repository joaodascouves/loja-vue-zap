<template>
  <div class="super">
    <div class="super__menu" @click="$emit('toggle')">
      <!-- <menu-toggle-icon /> -->
      <i class="fas fa-bars clickable" />
    </div>

    <div
      class="super__logo clickable header2"
      @click="$router.push({ path: '/' })"
    >
      {{ $store.getters["client/business"].name }}
    </div>

    <div class="super__user">
      <router-link to="/users/me">
        <i class="fas fa-user clickable" />
      </router-link>
    </div>

    <div class="super__logout" @click="logout">
      <i class="fas fa-sign-out-alt clickable" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store
        .dispatch('user/logout')
        .then(() => this.$router.push({ path: '/' }));
    },
  },
};
</script>

<style scoped src="static/styles/shared/super.css"></style>
<style scoped src="./super.css"></style>
