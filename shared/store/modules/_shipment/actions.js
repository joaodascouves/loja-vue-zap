export default {
  selectShipmentService({ commit, rootGetters }, id) {
    return new Promise((resolve, reject) => {
      const shipmentService = rootGetters['client/shipmentServices'].find(
        ({ _id }) => _id === id,
      );

      if (shipmentService) {
        commit('SHIPMENT_SERVICE_SELECT', shipmentService);
        resolve(shipmentService);
      } else {
        reject('Serviço não habilitado');
      }
    });
  },
  addShipmentService({ commit }) {
    commit('SHIPMENT_SERVICE_ADD');
  },
  removeShipmentService({ commit }, index) {
    commit('SHIPMENT_SERVICE_REMOVE', index);
  },
  clearShipmentService({ commit }) {
    commit('SHIPMENT_SERVICE_CLEAR');
  },
};
