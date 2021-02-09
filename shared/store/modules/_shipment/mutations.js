export default {
  SHIPMENT_SERVICE_SELECT(state, shipmentService) {
    state.selectedShipmentService = shipmentService;
  },
  SHIPMENT_SERVICE_ADD(state) {
    state.item.shipmentServices.push({
      name: '',
      baseCost: 0.0,
      localOnly: false,
      regions: [],
    });
  },
  SHIPMENT_SERVICE_REMOVE(state, index) {
    state.item.shipmentServices.splice(index, 1);
  },
  SHIPMENT_SERVICE_CLEAR(state) {
    state.selectedShipmentService = {};
  },
};
