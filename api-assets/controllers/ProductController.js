const { childController } = require('../utils');

// eslint-disable-next-line no-unused-vars
const { Category } = require('../models/Category');

const { Product } = require('../models/Product');
const { Discount } = require('../models/Discount');

const Controller = require('./_SharedController')(Product, {
  allowUpload: true,
  allowMultiple: true,
});
const DiscountController = childController(
  'discount',
  require('./DiscountController'),
);

const populate = (query) => query.populate('categories', 'slug title');

const ProductController = {
  ...Controller,
  ...DiscountController,

  get: ({ body }, clientId) => populate(Controller.get({ body }, clientId)),

  getAll: ({ body }, clientId) => populate(Controller.getAll({ body }, clientId)),
};

module.exports = ProductController;
