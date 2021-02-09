const { Discount } = require('../models/Discount');

/* eslint-disable no-unused-vars */
const { Order } = require('../models/Order');
const { User } = require('../models/User');
/* eslint-enable no-unused-vars */

const populate = (query) => query.populate({
  path: 'usedByOrders',
  model: 'Order',
  populate: [
    {
      path: 'cart',
      model: 'Cart',
    },
    {
      path: 'customer',
      model: 'User',
    },
  ],
});

const Controller = require('./_SharedController')(Discount, {});

const DiscountController = {
  ...Controller,

  adminGet: (req, clientId) => populate(Controller.get(req, clientId)),

  get: ({ body: { code } }, clientId) => {
    const now = new Date();

    return Controller.get(
      {
        body: {
          $and: [
            { code },
            { initDate: { $lte: now } },
            { expirationDate: { $gte: now } },
          ],
        },
      },
      clientId,
    );
  },

  getAll: (req, clientId) => populate(Controller.getAll(req, clientId)),
};

module.exports = DiscountController;
