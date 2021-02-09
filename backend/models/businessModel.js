import locationModel from './locationModel';

const businessModel = {
  '': {
    published: {
      type: 'checkbox',
      required: true,

      values: {
        true: 'Publicado (visível para o público)',
      },
    },
    physical: {
      type: 'checkbox',
      required: true,

      values: {
        true: 'Possui loja física',
      },
    },
    name: {
      type: 'text',
      label: 'Nome',
      required: true,
    },
    shortName: {
      type: 'text',
      label: 'Nome curto',
      required: true,
    },
    description: {
      type: 'text',
      label: 'Descrição do negócio',
      required: true,
    },
    keywords: {
      type: 'text',
      label: 'Palavras-chave',
      required: true,

      information: 'Ex.: são paulo,sp,video-games,playstation...',
    },
    phone: {
      type: 'text',
      label: 'Número WhatsApp',
      required: true,
    },
    email: {
      type: 'text',
      label: 'E-mail para contato',
      required: true,
    },
    instagram: {
      type: 'text',
      label: 'Usuário do Instagram',
      required: true,
    },
    location: {
      ...locationModel,
    },
  },
};

export default businessModel;
