const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const { VariationSchema } = require('../_Variation');

const CartStructure = {
  ...ParticularStructure,

  status: {
    type: String,
    default: 'idle',
    validate: {
      validator: (v) => ['idle', 'ordered', 'finished'].includes(v),
      message: (props) => `Status ${props.value} inválido`,
    },
  },
  // customer: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
  items: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false,
      },
      quantity: {
        type: Number,
        required: true,
      },
      variations: [VariationSchema],
    },
  ],
  totalAmount: {
    type: Number,
    default: 0,
  },
};

const CartSchema = mongoose.Schema(CartStructure, options);
require('./middlewares')(CartSchema);

const Cart = mongoose.model('Cart', CartSchema);

module.exports = { CartSchema, Cart };
