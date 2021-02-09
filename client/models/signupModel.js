const signupModel = {
  '': {
    name: {
      type: 'text',
      label: 'Nome completo',
      required: true,
    },
    phone: {
      type: 'text',
      label: 'Número de celular',
      required: true,

      mask: '(99) 99999-9999',
    },
    email: {
      type: 'text',
      label: 'Endereço de e-mail',
      required: true,
    },
    instagram: {
      type: 'text',
      label: 'Usuário do Instagram',
      required: false,

      mask: '@?{1,25}',
    },
    password: {
      type: 'password',
      label: 'Senha',
      required: true,
    },
    confirmation: {
      type: 'password',
      label: 'Confirmação de senha',
      required: true,
    },
  },
};

export default signupModel;
