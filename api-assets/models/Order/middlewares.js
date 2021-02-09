const { mongoose } = require('../../database');

const populate = (self) => self.populate([
  {
    path: 'cart',
    model: 'Cart',
    populate: {
      path: 'items',
      populate: {
        path: 'item',
        model: 'Product',
      },
    },
  },
  {
    path: 'customer',
    model: 'User',
  },
  {
    path: 'discount',
    model: 'Discount',
  },
  {
    path: 'shipment',
    populate: {
      path: 'service',
      model: 'ShipmentService',
    },
  },
  {
    path: 'payment',
    model: 'PaymentMethod',
  },
]);

module.exports = (Schema) => {
  Schema
    .post('save', async (doc, next) => {
      await populate(doc);
      next();
    })
    .pre('find', function (next) {
      populate(this);
      next();
    })
    .pre('findOne', function (next) {
      populate(this);
      next();
    })
    .pre('findOneAndUpdate', async function (next) {
      if (!this.getUpdate()._id) {
        throw new Error('ID deve ser especificado');
      }

      const order = await mongoose.model('Order').findById(this.getUpdate()._id);
      if (!order) {
        throw new Error('Pedido não encontrado');
      }

      // going from "sent" to another status
      if (this.getUpdate().status !== 'Enviado' && order.immutable) {
        throw new Error('Pedido imutável (já enviado)');
      }

      // going from another status to "sent"
      if (this.getUpdate().status === 'Enviado' && order.status !== 'Enviado') {
        await Promise.all(
          this.getUpdate().cart.items.map(async ({ item: { _id }, quantity }) => mongoose.model('Product').findOneAndUpdate(
            {
              $and: [
                // { clientId: order.clientId },
                { _id },
                { stock: { $gte: quantity } },
              ],
            },
            {
              $inc: {
                stock: -quantity,
              },
            },
          )),
        );

        this.getUpdate().immutable = true;
      }

      populate(this);
      next();
    })
    .pre('findOneAndDelete', async function () {
      const { cart } = this._conditions.$and.find((obj) => Object.keys(obj)[0] === 'cart') || {};
      const _id = typeof cart === 'object' ? cart._id : undefined;

      if (!_id) {
        throw new Error('ID do carrinho precisa ser fornecida');
      }

      await mongoose.model('Cart').findOneAndDelete({ _id });
    });
};
