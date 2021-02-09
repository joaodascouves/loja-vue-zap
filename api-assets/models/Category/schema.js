const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const CategoryStructure = {
  ...ParticularStructure,

  slug: {
    type: String,
    slug: 'title',
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
  image: {
    type: String,
    required: false,
  },
};

const CategorySchema = mongoose.Schema(CategoryStructure, options);
const Category = mongoose.model('Category', CategorySchema);

module.exports = { CategorySchema, Category };
