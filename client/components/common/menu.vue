<template>
  <div class="menu__container">
    <div class="menu">
      <div class="menu__search">
        <input-text
          class="menu__search__input"

          name="search"
          placeholder="Buscar"
          istyle="contrast rounded"
          icon="fa fa-search"

          @input="query = $event.target.value"
          @keyup.enter="search"
        />

        <button-base
          class="menu__search__button"
          title="Buscar"

          padding=".5em"
          @click="search"
        />
      </div>
      <div
        class="menu__route clickable"
        v-for="(route, rindex) in routes"
        :key="`route-${rindex}`"
      >
        <span
          :class="{ menu__route__name: true, expandable: !!route.children }"
          @click="redirectTo(route)"
        >
          {{ route.meta.title }}
        </span>
        <div
          class="menu__subroute clickable"
          v-for="(subroute, sindex) in (route.children || []).filter(
            child =>
              child.meta &&
              child.meta.hidden !== true &&
              child.meta.title !== undefined
          )"
          :key="`subroute-${sindex}`"
        >
          <span
            class="menu__subroute__name"
            @click="
              redirectTo({
                path: `${
                  subroute.path[0] === '/'
                    ? subroute.path
                    : `${route.path}/${subroute.path}`
                }`
              })
            "
          >
            {{ subroute.meta.title }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    };
  },
  computed: {
    routes() {
      const routes = this.$router.options.routes
        .filter((route) => this.isRoutePublic(route))
        .map((route) => (route.path !== '/products'
          ? route
          : {
            ...route,
            children: [
              {
                path: '/products/all',
                meta: { title: 'Todos os produtos' },
              },

              ...this.$store.getters['category/items'].map((category) => ({
                path: `/products/all?category=${category.slug}`,
                meta: {
                  title: category.title,
                },
              })),
            ],
          }
        ))
        .sort((a, b) => {
          if (!a.meta.priority) {
            return 1;
          }

          if (!b.meta.priority) {
            return -1;
          }

          return a.meta.priority > b.meta.priority ? -1 : 1;
        });

      return routes;
    },
  },
  methods: {
    redirectTo(to) {
      this.$router.push(to);
      this.$emit('toggle', false);
    },
    search() {
      this.$router.push({ path: `/products/all?search=${this.query}` });
      this.$emit('toggle', false);
    },
  },
};
</script>

<style scoped src="static/styles/shared/menu.css"></style>
<style scoped src="./menu.css"></style>
