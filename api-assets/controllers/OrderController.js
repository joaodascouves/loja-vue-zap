const { Order } = require('../models/Order');

/* eslint-disable no-unused-vars */
const { User } = require('../models/User');
const { Cart } = require('../models/Cart');
const { Product } = require('../models/Product');
const { Discount } = require('../models/Discount');
/* eslint-enable no-unused-vars */

const Controller = require('./_SharedController')(Order, {});

const OrderController = {
  ...Controller,

  save: async ({ body }, clientId, decodedToken) => {
    let customer = null;

    const {
      cart, user, location, shipmentService, payment, discount,
    } = body;

    // if customer is authenticated, performs an update
    // on his location informations.
    if (decodedToken && decodedToken._id) {
      customer = await User.findOneAndUpdate(
        { _id: decodedToken._id },
        {
          location,
        },
        { runValidators: true },
      );
    }

    // if customer isn't authenticated, upserts it
    // on database based on `phone` and `email` fields.
    if (!decodedToken || !decodedToken._id) {
      if (user.password && user.confirmation) {
        if (user.password !== user.confirmation) {
          throw new Error('Senhas não conferem');
        }
      }

      customer = await User.findOneAndUpdate(
        {
          $or: [{ phone: user.phone }, { email: user.email }],
        },
        {
          clientId,
          ...user,
          location,
        },
        {
          new: true,
          upsert: true,
          runValidators: true,
        },
      );
    }

    let discountDoc = null;

    // if discount ID is specificated...
    if (discount) {
      discountDoc = await Discount.findById(discount);

      // if exists, marks as already used by customer `id`.
      // else, throws an error.
      if (discountDoc) {
        if (discountDoc.usedByUsers.includes(customer._id)) {
          throw new Error('Cupom de desconto já usado');
        }

        discountDoc.usedByUsers.push(customer._id);
        await discountDoc.save();
      } else {
        throw new Error('Cupom de desconto inexistente');
      }
    }

    const newPayload = {
      cart,
      customer: customer._id,
      shipment: {
        service: shipmentService,
        location,
      },
      payment,
      discount,
    };

    const order = await Controller.save({ body: newPayload }, clientId);

    // if discount doc is opened, then
    // marks it as used by order `id`.
    if (discountDoc) {
      discountDoc.usedByOrders.push(order._id);
      await discountDoc.save();
    }

    return order;
  },

  adminSave: ({ body }, clientId) => Controller.save({ body }, clientId),
};

module.exports = OrderController;
