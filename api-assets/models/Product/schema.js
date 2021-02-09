const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const { VariationSchema } = require('../_Variation');

/* eslint-disable no-unused-vars */
const { Category } = require('../Category');
/* eslint-enable no-unused-vars */

const PackSchema = mongoose.Schema({
  weight: {
    type: Number,
    required: false,
  },
  format: {
    type: Number,
    required: false,
  },
  length: {
    type: Number,
    required: false,
  },
  height: {
    type: Number,
    required: false,
  },
  width: {
    type: Number,
    required: false,
  },
  diameter: {
    type: Number,
    required: false,
  },
});

const ProductStructure = {
  ...ParticularStructure,

  slug: {
    type: String,
    slug: ['title', 'gender'],
    slugPaddingSize: 4,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  sku: {
    type: String,
    required: false,
    uppercase: true,
  },
  stock: {
    type: Number,
    required: false,
    min: [0, 'Estoque precisa ser um inteiro positivo'],
  },
  price: {
    type: Number,
    required: true,
  },
  effectivePrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: false,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],

  variations: [VariationSchema],
  pack: PackSchema,

  freeShipping: {
    type: Boolean,
    default: false,
  },
  underRequest: {
    type: Boolean,
    default: false,
  },
};

const ProductSchema = mongoose.Schema(ProductStructure, options);
require('./middlewares')(ProductSchema);

const Product = mongoose.model('Product', ProductSchema);

module.exports = { PackSchema, ProductSchema, Product };
