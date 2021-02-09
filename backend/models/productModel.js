import store from 'backend/store';
import { parseVariations } from 'shared/helpers/business';

const productModel = () => ({
  '': {
    title: {
      type: 'text',
      label: 'Título',
      required: true,
    },
    description: {
      type: 'text',
      label: 'Especificações',
      required: true,
    },
    price: {
      type: 'number',
      label: 'Preço',
      min: 0,
      max: 10,
      required: true,

      width: '50%',
    },
    discount: {
      type: 'number',
      label: 'Desconto aplicado',
      max: 100,
      step: 5,
      required: true,
    },
    sku: {
      type: 'text',
      label: 'Controle de estoque (SKU)',
      required: false,

      width: '50%',
    },
    stock: {
      type: 'number',
      label: 'Peças em estoque',
      min: 0,
      required: false,
    },
    categories: {
      type: 'checkbox',
      label: 'Categorias',
      required: true,

      values: store.getters['category/items'].reduce(
        (a, { _id, title }) => ({ ...a, [_id]: title }),
        {},
      ),
    },

    variations: { ...parseVariations(store.getters['client/variations']) },

    pack: {
      weight: {
        type: 'number',
        label: 'Peso',
        required: true,

        information: `Informações referentes ao despacho de encomendas via correios.
        Os valores devem ser dados em quilogramas e centímetros.`,
      },
      format: {
        type: 'radio',
        label: 'Formato',
        required: true,

        values: {
          1: 'Caixa/pacote',
          2: 'Rolo/prisma',
          3: 'Envelope',
        },
      },
      length: {
        type: 'number',
        label: 'Comprimento',
        required: true,

        width: '50%',
      },
      height: {
        type: 'number',
        label: 'Altura',
        required: true,
      },
      width: {
        type: 'number',
        label: 'Largura',
        required: true,

        width: '50%',
      },
      diameter: {
        type: 'number',
        label: 'Diâmetro',
        required: true,
      },
    },

    freeShipping: {
      type: 'checkbox',
      required: true,
      values: {
        true: 'Frete grátis',
      },
    },
    underRequest: {
      type: 'checkbox',
      required: true,
      values: {
        true: 'Pedido sob encomenda',
      },
    },
    // gender: {
    //   type: 'radio',
    //   label: 'Gênero',
    //   required: true,

    //   values: {
    //     male: 'Masculino',
    //     female: 'Feminino',
    //     unisex: 'Unissex',
    //   },
    // },
    // sizes: {
    //   type: 'checkbox',
    //   label: 'Tamanho',
    //   required: true,
    //   values: ['PP', 'P', 'M', 'G', 'GG']
    //     .reduce((a, size) => ({ ...a, [size]: size }), {}),
    // },
  },
});

export default productModel;
