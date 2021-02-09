const bcrypt = require('bcryptjs');
const { mongoose } = require('../../database');

const validate = async (self) => {
  const existingUser = await mongoose.model('User').findOne({
    $and: [
      { clientId: self.clientId },
      { password: { $ne: null } },
      {
        $or: [{ email: self.email }, { phone: self.phone }],
      },
    ],
  });

  if (existingUser && existingUser._id != self._id) {
    if (existingUser.email === self.email) {
      throw new Error('E-mail já cadastrado');
    }

    if (existingUser.phone === self.phone) {
      throw new Error('Telefone já cadastrado');
    }
  }

  if (self.password) {
    if (self.password.length < 6) {
      throw new Error('A senha precisa ter 6 caracteres ou mais');
    }

    self.password = await bcrypt.hash(self.password, 10);
  }
};

module.exports = (Schema) => {
  Schema
    .pre('save', async function () {
      await validate(this);
    })
    .pre('findOneAndUpdate', async function () {
      await validate(this.getUpdate());
    });
};
