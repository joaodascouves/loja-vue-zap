const { mongoose, options } = require('../../database');
const { ParticularStructure } = require('../_Shared');

const { LocationSchema } = require('../_Location');

const UserStructure = {
  ...ParticularStructure,

  slug: {
    type: String,
    slug: 'name',
    slugPaddingSize: 4,
    unique: true,
  },
  role: {
    type: String,
    default: 'user',
    validate: {
      validator: (v) => ['user', 'admin'].includes(v),
      message: (props) => `Privilégio '${props.value}' inválido`,
    },
  },
  name: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => /^((([A-Z][a-zãêáéíóâêô]{1,})|[a-z]*)(\s|$)){2,}$/.test(v),
    //   message: (props) => `Nome '${props.value}' inválido`,
    // },
  },
  phone: {
    type: String,
    required: true,
    // validate: {
    //   validator: (v) => /^[0-9]{11}$/.test(v),
    //   message: () => 'Telefone precisa estar no formato 11999999999',
    // },
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: {
      validator: (v) => /^([a-zA-Z0-9]|-|\.)+@([a-zA-Z0-9]|-|\.)+\.([a-zA-Z]+\.?){2,}$/.test(v),
      message: (props) => `Email '${props.value}' inválido`,
    },
  },
  instagram: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: false,
    select: false,
  },
  bornDate: {
    type: String,
    required: false,
    validate: {
      validator: (v) => {
        let fields = v.split('/');

        if (
          fields.length !== 3
          || !fields.reduce((a, c) => a && !isNaN(c), true)
        ) {
          return false;
        }

        fields = fields.map((f) => Number(f));

        if (
          fields[0] < 1
          || fields[0] > 31
          || fields[1] < 1
          || fields[1] > 12
          || fields[2] < 1940
          || fields[2] > 2015
        ) {
          return false;
        }

        return true;
      },
      message: () => 'Insira uma data no formato dd/mm/yyyy',
    },
  },
  document: {
    type: String,
    required: false,
  },

  location: LocationSchema,
};

const UserSchema = mongoose.Schema(UserStructure, options);
require('./middlewares')(UserSchema);

// UserSchema.methods.comparePassword

const User = mongoose.model('User', UserSchema);

module.exports = { UserSchema, User };
