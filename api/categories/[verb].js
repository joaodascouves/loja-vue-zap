const { entrypoint, configEndpoint } = require('../../api-assets/entrypoint');

const params = {
  controller: require('../../api-assets/controllers/CategoryController'),
  description: 'Categoria',
};

module.exports = entrypoint((req, res, clientId, auth) => configEndpoint(params)(req, res, clientId, auth));
