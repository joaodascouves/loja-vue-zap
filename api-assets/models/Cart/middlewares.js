const sumTotal = (items) => items.reduce((a, { item }) => ((item && item.effectivePrice) ? a + item.effectivePrice : 0), 0);

const validate = async (self) => {
  if (self.items.length === 0) {
    throw new Error('O carrinho está vazio');
  }
};

const addCartMeta = (doc, next) => {
  doc
    .populate({
      path: 'items',
      populate: {
        path: 'item',
        model: 'Product',
      },
    })
    .execPopulate()
    .then(() => {
      doc.totalAmount = sumTotal(doc.items);
      doc.save();

      next();
    });
};

module.exports = (Schema) => {
  Schema
    .pre('save', async function () {
      await validate(this);
    })
    .pre('findOneAndUpdate', async function () {
      await validate(this.getUpdate());
    })
    .post('save', addCartMeta)
    .post('findOneAndUpdate', addCartMeta);
};
