export default ({ router, store }) => ({
  methods: {
    viewItem: (payload) => {
      const [context, item] = Object.entries(payload)[0];

      store.commit(`${context}/ITEM_SAVE`, item);
      router.push({ path: `/${context}/${item.slug}` });
    },
    isRoutePublic: (route) => route.meta
      && route.meta.title
      && route.meta.hidden !== true
      && route.meta.super !== true
      && (route.meta.public === true || window._isLoggedIn()),
    goBack(fallback) {
      if (!this.$root.$c_fromRoute) {
        this.$router.push(fallback);
      } else {
        this.$router.back();
      }
    },
  },
});
