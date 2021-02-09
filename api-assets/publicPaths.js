module.exports = [
  'api/cart/save',
  'api/categories/get',
  'api/categories/getAll',
  'api/configuration/client_get',
  'api/configuration/render',
  'api/featured/get',
  'api/featured/getAll',
  'api/orders/get',
  'api/orders/save',
  'api/products/get',
  'api/products/getAll',
  'api/products/discount_get',
  'api/users/get',
  'api/users/auth',
  'api/users/save',
  'api/users/userExists',

  '^(?!api/)',
];