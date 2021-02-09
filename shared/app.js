export default {
  methods: {
    toggleMenu(value) {
      this.show = value || !this.show;
    },
    hideMenu(event) {
      const {
        path: [wrapper, element],
      } = event;

      if (
        element.classList
        && ['super__menu', 'super__search__mobile'].find((c) => element.classList.contains(c))
      ) {
        return;
      }

      if (this.show === true) {
        event.preventDefault();
        this.toggleMenu(false);
      }
    },
  },
};
