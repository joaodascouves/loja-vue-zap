export default ({ router, store }) => ({
  methods: {
    modifyItem: (payload) => {
      const [context, item] = Object.entries(payload)[0];

      store.commit(`${context}/ITEM_SAVE`, item);
      router.push({ path: `modify/${item.slug || item._id}` });
    },
    saveItem: (payload) => {
      const [context, item] = Object.entries(payload)[0];

      store.dispatch(`${context}/save`, item).then(() => {
        store.dispatch(`${context}/clear`);

        const { fullPath } = router.app._route;
        router.push({ path: fullPath.replace(/\/(add|modify)\/?.*/, '/list') });
      });
    },
    // removeItem: (payload) => {
    //   const [context, item] = Object.entries(payload)[0];
    //   store.dispatch(`${context}/remove`, item);
    // },
    removeImage: (payload) => {
      const [context, item] = Object.entries(payload)[0];
      store.dispatch(`${context}/removeImage`, item);
    },
    removeItem(payload) {
      this.$store.dispatch('changePopup', {
        popup: {
          id: 'removeItem',
          title: 'Remover mesmo o item?',
          message: 'Isso não poderá ser desfeito.',
        },
        data: {
          context: Object.keys(payload)[0],
          ...Object.values(payload)[0],
        },
      });
    },
  },
});
