const discountModel = {
  '': {
    code: {
      type: 'text',
      label: 'Código',
      required: true,
      placeholder: 'Ex.: JURANDIR10',
    },
    discount: {
      type: 'number',
      label: 'Desconto (%)',
      required: true,
      placeholder: 'Ex.: 50',
    },
    initDate: {
      type: 'text',
      label: 'Data de início',
      required: false,

      information: 'Formato AAAA-MM-DD; valor padrão: hoje',
    },
    expirationDate: {
      type: 'text',
      label: 'Valido até',
      required: false,

      information: 'Valor padrão: válido por três dias a partir de hoje',
    },
  },
};

export default discountModel;
