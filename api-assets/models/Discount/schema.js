const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const DiscountStructure = {
  ...ParticularStructure,

  code: {
    type: String,
    required: true,
    uppercase: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  initDate: {
    type: Date,
    default: () => new Date(),
  },
  expirationDate: {
    type: Date,
    default: () => +new Date() + 1000 * 60 * 60 * 24 * 3,
  },
  usedByUsers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
  ],
  usedByOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
      required: false,
    },
  ],
};

const DiscountSchema = mongoose.Schema(DiscountStructure, options);
require('./middlewares')(DiscountSchema);

const Discount = mongoose.model('Discount', DiscountSchema);

module.exports = { DiscountSchema, Discount };
