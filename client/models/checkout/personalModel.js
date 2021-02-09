export default function personalModel() {
  return {
    '': {
      ...(!this.$store.getters['user/currentUser']._id
        ? {
          phone: {
            type: 'text',
            label: 'Número de celular',
            required: true,
            icon: 'fa fa-mobile',

            mask: '(99) 99999-9999',
          },
          email: {
            type: 'text',
            label: 'Endereço de e-mail',
            required: true,

            icon: 'fa fa-envelope',
          },

          createAccount: {
            type: 'checkbox',
            label: 'Deseja salvar suas informações para futuras compras?',
            required: true,

            values: {
              true: 'Sim, criar uma conta',
            },
          },
          ...(this.createAccount === true
            ? {
              password: {
                type: 'password',
                label: 'Senha',
                required: true,

                icon: 'fa fa-key',
              },
              confirmation: {
                type: 'password',
                label: 'Confirmação de senha',
                required: true,

                icon: 'fa fa-key',
              },
            }
            : {}),
        }
        : {}),
      name: {
        type: 'text',
        label: 'Nome completo',
        required: true,

        width: '60%',
        mobileWidth: '100%',
      },
      instagram: {
        type: 'text',
        label: 'Usuário do Instagram',
        required: false,

        mask: '@?{1,25}',
      },
    },
  };
}
