const mongoose = require('mongoose');
// const cachegoose = require('cachegoose');

const slug = require('mongoose-slug-updater');

const { MONGODB_URI } = process.env;

// cachegoose(mongoose, {
//   engine: 'redis',
//   port: 30340,
//   host: 'usw1-thankful-cattle-30340.lambda.store',
//   password: '679f242ad7d5407186d5eaeda53e27ac',
// });

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

mongoose.Promise = global.Promise;
mongoose.plugin(slug);

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

module.exports = {
  mongoose,
  options,
};
