export default function paymentModel() {
  const getMethods = (local) => this.$store.getters['client/paymentMethods']
    .filter((service) => service[local ? 'local' : 'nonLocal'] === true)
    .reduce((a, { _id, name }) => ({ ...a, [_id]: name }), {});

  const localMethods = getMethods(true);
  const nonLocalMethods = getMethods(false);

  return {
    '': {
      payment: {
        type: 'radio',
        label: 'Forma de pagamento',
        required: true,

        values: {
          ...(this.localPayment === 'true' ? localMethods : nonLocalMethods),
        },
      },
    },
  };
}
