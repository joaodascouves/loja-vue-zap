const { mongoose } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const RegionSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const ShipmentServiceStructure = {
  ...ParticularStructure,

  name: {
    type: String,
    required: true,
  },
  baseCost: {
    type: Number,
    required: true,
  },
  local: {
    type: Boolean,
    default: false,
  },
  nonLocal: {
    type: Boolean,
    default: false,
  },

  regions: [RegionSchema],
};

const ShipmentServiceSchema = mongoose.Schema(ShipmentServiceStructure);
const ShipmentService = mongoose.model(
  'ShipmentService',
  ShipmentServiceSchema,
);

module.exports = {
  RegionSchema,
  ShipmentServiceSchema,
  ShipmentService,
};
