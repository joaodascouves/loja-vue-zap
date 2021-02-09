const { mongoose } = require('../../database');

const populate = async (self) => {
  self.populate({
    path: 'usedByOrders',
    model: 'Order',
    populate: [
      {
        path: 'cart',
        model: 'Cart',
      },
      {
        path: 'customer',
        model: 'User',
      },
    ],
  });
};

const validate = async (self) => {
  const existingDiscount = await mongoose.model('Discount').findOne({
    $and: [{ clientId: self.clientId }, { code: self.code }],
  });

  if (existingDiscount && existingDiscount._id != self._id) {
    throw new Error('Código já existente');
  }

  // const now = new Date();

  // if( !self.initDate ) {
  //   self.initDate = now;
  // }

  // if( !self.expirationDate ) {
  //   self.expirationDate = +now + 1000*60*60*24*3;
  // }
};

module.exports = (Schema) => {
  Schema
    .pre('save', async function () {
      await validate(this);
      await populate(this);
    })
    .pre('findOneAndUpdate', async function () {
      await validate(this.getUpdate());
      await populate(this);
    });
};
