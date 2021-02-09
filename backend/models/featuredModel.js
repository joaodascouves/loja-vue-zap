const featuredModel = {
  '': {
    title: {
      type: 'text',
      label: 'Nome',
      required: false,
    },
    description: {
      type: 'text',
      label: 'Descrição',
      required: false,
    },
    action: {
      type: 'text',
      label: 'Ação',
      required: false,
    },
    link: {
      type: 'text',
      label: 'Link',
      required: true,
    },
    visible: {
      type: 'checkbox',
      label: 'Visível',
      required: true,

      values: {
        true: 'Sim',
      },
    },
  },
};

export default featuredModel;
