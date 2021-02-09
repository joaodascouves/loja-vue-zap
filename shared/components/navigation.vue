<template>
  <div class="navigation">
    <span v-for="(location, index) in locations" :key="`location-${index}`">
      <router-link :to="location.path">
        {{ location.title }}
      </router-link>
    </span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      locations: [],
    };
  },
  mounted() {
    this.refresh();
  },
  methods: {
    refresh() {
      this.locations = [];

      const { path, meta } = this.$route;
      const { name } = this.$store.getters['client/business'];

      const matches = path.match(/(\w+)\/(\w+)/);

      /* eslint-disable */
      const parent = !matches
        ? undefined
        : this.$router.options.routes.filter(
            (route) =>
              route.path === `/${matches[1]}` && route.meta && route.meta.title !== undefined,
          )[0];
      /* eslint-enable */

      this.locations = [...this.locations, { title: name, path: '/' }];
      this.locations = [...this.locations, { title: meta.title, path }];

      if (parent !== undefined) {
        this.locations.splice(1, 0, {
          title: parent.meta.title,
          path: parent.path,
        });
      }
    },
  },
  watch: {
    $route: {
      deep: true,
      handler(event) {
        this.refresh();
      },
    },
  },
};
</script>

<style scoped src="./navigation.css"></style>
