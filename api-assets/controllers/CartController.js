const { Cart } = require('../models/Cart');

/* eslint-disable no-unused-vars */
const { User } = require('../models/User');
const { Product } = require('../models/Product');
/* eslint-enable no-unused-vars */

const Controller = require('./_SharedController')(Cart, {});

const populate = (query) => query.populate('customer').populate('items');

const CartController = {
  ...Controller,

  save: async ({ body }, clientId) => {
    console.log(body);

    const cart = await Controller.save({ body }, clientId);

    if (!cart) {
      throw new Error('Erro ao salvar carrinho');
    }

    return { _id: cart._id };
  },

  get: ({ body }, clientId) => populate(Controller.get({ body }, clientId)),

  getAll: ({ body }) => populate(Controller.getAll({ body }, clientId)),
};

module.exports = CartController;
