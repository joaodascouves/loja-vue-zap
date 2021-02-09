import * as GridComponents from 'client/components/_grid';
import * as CheckoutModels from 'client/models/checkout';

export default {
  components: {
    ...GridComponents,
  },
  computed: {
    ...CheckoutModels,

    user() {
      return this.$store.getters['user/currentUser'];
    },

    selectedShipmentService() {
      const service = this.$store.getters['order/selectedShipmentService'];

      return Object.keys(service).length > 0
        ? service
        : {
          name: undefined,
          baseCost: 0.0,
        };
    },
  },
  data() {
    return {
      localOrder: this.hasShipmentServices('local') ? 'true' : 'false',
      localPayment: this.hasPaymentMethods('local') ? 'true' : 'false',

      shipment: {
        service: undefined,
      },

      payment: {},
    };
  },
  methods: {
    hasShipmentServices(type) {
      return (
        this.$store.getters['client/shipmentServices'].filter((method) => (
          method[type] === true
        )).length > 0
      );
    },
    hasPaymentMethods(type) {
      return (
        this.$store.getters['client/paymentMethods'].filter((method) => (
          method[type] === true

        )).length > 0
      );
    },
  },
};
