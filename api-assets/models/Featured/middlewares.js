const { mongoose } = require('../../database');

const triggerVisible = async (self) => {
  if (self.visible === true) {
    return mongoose.model('Featured').updateMany(
      {
        $and: [
          { clientId: self.clientId },
          { _id: { $ne: self._id } },
          { visible: true },
        ],
      },
      {
        visible: false,
      },
    );
  }
  return Promise.resolve();
};

module.exports = (Schema) => {
  Schema
    .post('save', (doc, next) => {
      triggerVisible(doc).then(() => next());
    })
    .post('findOneAndUpdate', (doc, next) => {
      triggerVisible(doc).then(() => next());
    });
};
