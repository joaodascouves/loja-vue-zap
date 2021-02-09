export default {
  watch: {
    '$store.getters.popupAccepted': {
      deep: true,
      handler({ id }) {
        if (id !== 'removeItem') {
          return;
        }

        const { context, ...payload } = this.$store.getters.popupData;

        this.$store.dispatch(`${context}/remove`, payload);
        this.$store.dispatch('closePopup');
      },
    },
  },
};
