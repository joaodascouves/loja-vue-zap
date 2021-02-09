const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const FeaturedStructure = {
  ...ParticularStructure,

  slug: {
    type: String,
    slug: ['title', 'link'],
    slugPaddingSize: 4,
    unique: true,
  },
  title: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
    required: true,
  },
  action: {
    type: String,
    required: false,
  },
  link: {
    type: String,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true,
  },
};

const FeaturedSchema = mongoose.Schema(FeaturedStructure, options);
require('./middlewares')(FeaturedSchema);

// FeaturedSchema.post('save', async (doc, next) => {
//   await triggerVisible(doc);
//   next();
// });

// FeaturedSchema.post('findOneAndUpdate', async (doc, next) => {
//   await triggerVisible(doc);
//   next();
// });

const Featured = mongoose.model('Featured', FeaturedSchema);

module.exports = { FeaturedSchema, Featured };
