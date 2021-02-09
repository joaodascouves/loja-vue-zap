import locationModel from './locationModel';

const userModel = {
  '': {
    name: {
      type: 'text',
      label: 'Nome completo',
      required: true,
    },
    role: {
      type: 'radio',
      label: 'Privilégio',
      required: true,

      values: {
        user: 'Usuário',
        admin: 'Administrador',
      },
    },
    phone: {
      type: 'number',
      label: 'Número de telefone',
      required: true,
    },
    bornDate: {
      type: 'text',
      label: 'Data de nascimento',
      required: false,
    },
    document: {
      type: 'number',
      label: 'CPF ou CNPJ',
      required: false,
    },
    email: {
      type: 'text',
      label: 'Endereço de e-mail',
      required: true,
    },
    password: {
      type: 'password',
      label: 'Senha',
      required: false,
    },
    confirmation: {
      type: 'password',
      label: 'Confirmação de senha',
      required: false,
    },

    location: {
      ...locationModel,
    },
  },
};

export default userModel;
