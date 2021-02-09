const { mongoose } = require('../../database');

const populate = async (self) => self.populate('categories', 'slug title');

const validate = async (self) => {
  if (self.sku) {
    const existingProduct = await mongoose.model('Product').findOne({
      $and: [
        { slug: { $ne: self.slug } },
        { clientId: self.clientId },
        { sku: self.sku },
      ],
    });

    if (existingProduct) {
      throw new Error(
        `O produto '${existingProduct.title}' já possui o SKU ${existingProduct.sku}`,
      );
    }
  }
};

const setEffectivePrice = async (self) => {
  const { price, discount } = self;

  if (price) {
    self.effectivePrice = discount > 0
      ? price - (price * discount) / 100
      : price;
  }
};

module.exports = (Schema) => {
  Schema
    .pre('save', async function () {
      await setEffectivePrice(this);
      await validate(this);
      // await populate(this);
    })
    .pre('findOneAndUpdate', async function () {
      await setEffectivePrice(this.getUpdate());
      await validate(this.getUpdate());
      // await populate(this);
    });
};
