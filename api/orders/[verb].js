const { entrypoint, configEndpoint } = require('../../api-assets/entrypoint');

const params = {
  controller: require('../../api-assets/controllers/OrderController'),
  description: 'Pedido',
};

module.exports = entrypoint((req, res, clientId, auth) => configEndpoint(params)(req, res, clientId, auth));
