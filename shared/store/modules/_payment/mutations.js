export default {
  PAYMENT_METHOD_ADD(state) {
    state.item.paymentMethods.push({
      name: '',
      baseCost: 0.0,
      tax: 0.0,
      localOnly: false,
    });
  },
  PAYMENT_METHOD_REMOVE(state, index) {
    state.item.paymentMethods.splice(index, 1);
  },
};
