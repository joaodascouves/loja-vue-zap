const { mongoose } = require('../../database');

const LocationStructure = {
  city: {
    type: String,
    required: false,
  },
  state: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  zipcode: {
    type: String,
    required: true,
  },
  complement: {
    type: String,
    required: false,
  },
};

const LocationSchema = mongoose.Schema(LocationStructure, { _id: false });
module.exports = { LocationSchema };
