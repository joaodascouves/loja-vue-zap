export default {
  city: {
    type: 'text',
    label: 'Cidade',
    required: true,

    width: '60%',
  },
  state: {
    type: 'text',
    label: 'Unidade Federativa (ex.: MG)',
    required: true,
  },
  street: {
    type: 'text',
    label: 'Rua, avenida, ou logradouro',
    required: true,
  },
  number: {
    type: 'text',
    label: 'Número',
    required: true,

    width: '50%',
  },
  district: {
    type: 'text',
    label: 'Bairro',
    required: true,
  },
  zipcode: {
    type: 'text',
    label: 'Código postal (CEP)',
    required: true,

    width: '50%',
  },
  complement: {
    type: 'text',
    label: 'Complemento',
    required: false,
  },
};
