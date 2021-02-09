const { mongoose } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const PaymentMethodStructure = {
  ...ParticularStructure,

  name: {
    type: String,
    required: true,
  },
  baseCost: {
    type: Number,
    default: 0.0,
  },
  tax: {
    type: Number,
    default: 0,
  },
  local: {
    type: Boolean,
    default: false,
  },
  nonLocal: {
    type: Boolean,
    default: false,
  },
};

const PaymentMethodSchema = mongoose.Schema(PaymentMethodStructure);
const PaymentMethod = mongoose.model('PaymentMethod', PaymentMethodSchema);

module.exports = { PaymentMethodSchema, PaymentMethod };
