<template>
  <div class="bottom-section">
    <div class="section" data-name="Navegação">
      <ul>
        <li
          v-for="(route, index) in $router.options.routes.filter(route =>
            isRoutePublic(route)
          )"
          :key="`route-${index}`"
        >
          <router-link :to="route.path">
            {{ route.meta.title }}
          </router-link>
        </li>
      </ul>
    </div>

    <div class="section" data-name="Contato">
      <ul>
        <li>Suporte técnico: joaosan177@gmail.com</li>
      </ul>
    </div>

    <div class="section" data-name="Cliente">
      <ul>
        <li>ID de negócio: {{ business._id }}</li>
        <li>Criado em: {{ localDateFormat(business.created_at) }}</li>
        <li>Versão: {{ business.version }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    business() {
      return this.$store.getters['client/business'];
    },
  },
};
</script>

<style scoped src="./bottom.css"></style>
