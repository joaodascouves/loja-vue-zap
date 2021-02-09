const signinModel = {
  '': {
    email: {
      type: 'text',
      label: 'E-mail ou telefone',
      required: true,

      icon: 'fa fa-envelope',
    },
    password: {
      type: 'password',
      label: 'Senha',
      required: true,

      icon: 'fa fa-key',
    },
  },
};

export default signinModel;
