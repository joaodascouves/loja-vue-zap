export default function shipmentServiceModel() {
  const getServices = (local) => this.$store.getters['client/shipmentServices']
    .filter((service) => service[local ? 'local' : 'nonLocal'] === true)
    .reduce((a, { _id, name }) => ({ ...a, [_id]: name }), {});

  const localServices = getServices(true);
  const nonLocalServices = getServices(false);

  return {
    '': {
      service: {
        type: 'select',
        label: 'Serviço',
        required: true,

        values: {
          ...localServices,
          ...nonLocalServices,
        },
      },
    },
  };
}
