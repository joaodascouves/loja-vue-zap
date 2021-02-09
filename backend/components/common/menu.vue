<template>
  <div class="menu__container">
    <div class="menu">
      <div
        class="menu__route menu__route--vertical clickable"
        v-for="(route, rindex) in $router.options.routes.filter(route =>
          isRoutePublic(route)
        )"
        :key="`route-${rindex}`"
      >
        <span
          :class="{ menu__route__name: true, expandable: !!route.children }"
          @click="route.children ? expand(rindex) : redirectTo(route)"
        >
          {{ route.meta.title }}
        </span>
        <div
          :class="{
            menu__subroute: true,
            'menu__subroute--expanded': rindex === expanded,
            clickable: true
          }"
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
            @click="redirectTo({ path: `${route.path}/${subroute.path}` })"
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
      expanded: -1,
    };
  },
  methods: {
    redirectTo({ path }) {
      this.$router.push({ path });
      this.$emit('toggle', false);
    },
    expand(index) {
      this.expanded = this.expanded !== index ? index : -1;
    },
  },
};
</script>

<style scoped src="static/styles/shared/menu.css"></style>
<style scoped src="./menu.css"></style>
