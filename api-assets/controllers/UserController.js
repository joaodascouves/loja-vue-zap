const bcrypt = require('bcryptjs');

const { User } = require('../models/User');
const Controller = require('./_SharedController')(User, {});

const authService = require('../services/authService');

const { MASTER_USERNAME, MASTER_PASSWORD } = process.env;

const UserController = {
  ...Controller,

  exists: ({ body: { email, phone } }, clientId) => Controller.exists(
    {
      body: {
        password: { $ne: null },
        $or: [{ email }, { phone }],
      },
    },
    clientId,
  ),

  save: async ({ body }, clientId, auth) => {
    /* eslint-disable prefer-const */
    let {
      _id, role, password, confirmation,
    } = body;
    /* eslint-enable prefer-const */

    const payload = body;

    role = auth && auth.role !== 'admin' ? 'user' : role;

    body = { ...body, role };

    if (!['user', 'admin'].includes(role)) {
      throw new Error('Privilégio inválido');
    }

    if (
      _id === undefined
      && (typeof password !== 'string' || password.length === 0)
    ) {
      throw new Error('Senha inválida');
    }

    if (password !== undefined && password.length > 0) {
      if (password !== confirmation) {
        throw new Error('Senhas não conferem');
      }
    }

    const user = await Controller.save({ body: payload }, clientId);

    return {
      ...user._doc,
      password: undefined,
    };
  },

  remove: ({ body }, clientId, decodedToken) => {
    const { _id } = decodedToken;

    if (_id === body._id) {
      throw new Error('Você quer mesmo cometer suicídio?');
    }

    return Controller.remove({ body }, clientId);
  },

  auth: async ({ body: { email, password } }, clientId) => {
    if (!email || !password) {
      throw new Error('Preencha todos os campos');
    }

    if (MASTER_USERNAME === email && MASTER_PASSWORD === password) {
      const user = {
        role: 'admin',
      };

      return {
        user,
        token: authService.createToken(user),
      };
    }

    const user = await User.findOne({
      $and: [
        { clientId },
        {
          $or: [{ email }, { phone: email }],
        },
      ],
    }).select('+password');

    if (!user) {
      throw new Error('Usuário não cadastrado');
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error('Senha inválida');
    }

    return {
      user: {
        ...user._doc,
        password: undefined,
      },
      token: authService.createToken({
        clientId,
        _id: user._id,
        role: user.role,

        email: user.email,
        phone: user.phone,
      }),
    };
  },
};

module.exports = UserController;
