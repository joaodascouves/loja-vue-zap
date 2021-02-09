const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const { LocationSchema } = require('../_Location');

/* eslint-disable no-unused-vars */
const { Cart } = require('../Cart');
const { Discount } = require('../Discount');
const { ShipmentService } = require('../ShipmentService');
const { PaymentMethod } = require('../PaymentMethod');
/* eslint-enable no-unused-vars */

const OrderStructure = {
  ...ParticularStructure,

  status: {
    type: String,
    default: 'Pendente',
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart',
    required: true,
  },
  shipment: {
    trackNumber: {
      type: String,
      required: false,
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShipmentService',
      required: true,
    },
    location: LocationSchema,
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PaymentMethod',
    required: true,
  },
  discount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Discount',
    required: false,
  },
  immutable: {
    type: Boolean,
    default: false,
  },
};

const OrderSchema = mongoose.Schema(OrderStructure, options);
require('./middlewares')(OrderSchema);

const Order = mongoose.model('Order', OrderSchema);

module.exports = { OrderSchema, Order };
