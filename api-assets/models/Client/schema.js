const { mongoose, options } = require('../../database');

const { VariationSchema } = require('../_Variation');
const { LocationSchema } = require('../_Location');

/* eslint-disable no-unused-vars */
const { ShipmentService } = require('../ShipmentService');
const { PaymentMethod } = require('../PaymentMethod');
/* eslint-enable no-unused-vars */

const ThemeSchema = mongoose.Schema(
  {
    thematicColor1: {
      type: String,
      default: '#cecece',
    },
    thematicColor2: {
      type: String,
      default: '#000000',
    },
    thematicColor3: {
      type: String,
      default: '#f6e7ff',
    },
    thematicColor4: {
      type: String,
      default: '#000000',
    },
    superShadow: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const TextSectionsSchema = mongoose.Schema(
  {
    aboutUs: {
      type: String,
      required: false,
    },
    termsOfUse: {
      type: String,
      required: false,
    },
    privacyPolicy: {
      type: String,
      required: false,
    },
  },
  { _id: false },
);

const ClientStructure = {
  active: {
    type: Boolean,
    default: true,
  },
  published: {
    type: Boolean,
    default: true,
  },
  physical: {
    type: Boolean,
    default: false,
  },
  domains: [
    {
      type: String,
      required: true,
      unique: true,
    },
  ],
  name: {
    type: String,
    required: true,
  },
  shortName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  keywords: {
    type: String,
    required: false,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  logo: {
    type: String,
    required: true,
  },
  instagram: {
    type: String,
    required: false,
  },
  theme: ThemeSchema,
  textSections: TextSectionsSchema,

  variations: [VariationSchema],
  location: LocationSchema,

  shipmentServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ShipmentService',
      required: true,
    },
  ],
  paymentMethods: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PaymentMethod',
      required: true,
    },
  ],

  ref: {
    type: String,
    required: false,
  },
};

const ClientSchema = mongoose.Schema(ClientStructure, options);
require('./middlewares')(ClientSchema);

const Client = mongoose.model('Client', ClientSchema);

module.exports = { ClientSchema, Client };
