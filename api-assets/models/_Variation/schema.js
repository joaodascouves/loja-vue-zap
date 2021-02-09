const { mongoose } = require('../../database');

const VariationStructure = {
  name: {
    type: String,
    required: false,

    validate: {
      validator: (v) => /^[a-zA-Z]/.test(v),
      message: () => 'A inicial do nome da variação deve ser uma letra',
    },
  },
  value: [
    {
      type: String,
      required: false,
      lowercase: false,
    },
  ],
  selected: {
    type: String,
    required: false,
  },
};

const VariationSchema = mongoose.Schema(VariationStructure, { _id: false });
module.exports = { VariationSchema };
