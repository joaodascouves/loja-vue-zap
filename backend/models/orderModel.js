import userModel from './userModel';
import locationModel from './locationModel';

const orderModel = {
  '': {
    status: {
      type: 'radio',
      label: 'Status',

      values: {
        ...['Pendente', 'Aprovado', 'Enviado'].reduce(
          (a, i) => ({ ...a, [i]: i }),
          {},
        ),
      },
    },
  },
  'Dados do comprador': {
    customer: {
      name: {
        type: 'text',
        label: 'Nome completo',
        readonly: true,
      },
      document: {
        type: 'text',
        label: 'CPF',
        readonly: true,
      },
      phone: {
        type: 'text',
        label: 'Número de telefone',
        readonly: true,
      },
    },
  },
  'Dados da entrega': {
    shipment: {
      trackNumber: {
        type: 'text',
        label: 'Código de rastreio',
        readonly: false,
      },
      service: {
        name: {
          type: 'text',
          label: 'Tipo de serviço',
          readonly: true,
        },
        baseCost: {
          type: 'number',
          label: 'Custo do frete',
          readonly: true,
        },
      },
      location: {
        ...locationModel,
      },
    },
  },
};

export default orderModel;
