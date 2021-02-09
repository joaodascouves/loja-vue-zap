export function addToCart(_self) {
  const self = _self || this;
  const product = self.$store.getters['product/item'];

  product.variations = product.variations.filter(({ selected }) => !!selected);

  self.$store.dispatch('cart/addItem', product);

  if (!this.isMobile()) {
    this.$router.push({ path: '/cart' });
  }
}
