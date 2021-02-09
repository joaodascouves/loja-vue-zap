export default function shipmentModel() {
  return {
    '': {
      location: {
        zipcode: {
          type: 'text',
          label: 'Código postal',
          required: true,

          mask: '99999-999',
        },
        city: {
          type: 'text',
          label: 'Cidade',
          required: true,

          width: '70%',
        },
        state: {
          type: 'text',
          label: 'UF',
          required: true,

          mask: 'AA',
        },
        street: {
          type: 'text',
          label: 'Rua, avenida ou logradouro',
          required: true,
        },
        number: {
          type: 'number',
          label: 'Número',
          required: true,

          width: '40%',
        },
        district: {
          type: 'text',
          label: 'Bairro',
          required: true,
        },
        complement: {
          type: 'text',
          label: 'Complemento',
          required: false,
        },
      },
    },
  };
}
