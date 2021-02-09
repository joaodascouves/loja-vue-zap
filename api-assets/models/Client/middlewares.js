const { validateVariations } = require('../../utils/validation');

const validate = async (self) => {
  if (self.domains.length === 0) {
    throw new Error('Pelo menos um domínio deve ser associado');
  }
};

module.exports = (Schema) => {
  Schema
    .pre('save', validate)
    .pre('findOneAndUpdate', async function () {
      validateVariations(this.getUpdate());
    });
};
