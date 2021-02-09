const themeModel = {
  '': {
    theme: {
      thematicColor1: {
        type: 'text',
        label: 'Cor temática #1',
        required: true,

        information: 'Ícones da barra superior',
      },
      thematicColor2: {
        type: 'text',
        label: 'Cor temática #2',
        required: true,

        information: 'Fundo da barra superior',
      },
      thematicColor3: {
        type: 'text',
        label: 'Cor temática #3',
        required: true,

        information: 'Texto do menu',
      },
      thematicColor4: {
        type: 'text',
        label: 'Cor temática #4',
        required: true,

        information: 'Fundo do menu, discontos, botões',
      },
      superShadow: {
        type: 'checkbox',
        label: 'Sombreamento da barra superior',
        required: true,

        values: {
          true: 'Ativar sombreamento da barra superior',
        },
      },
    },
  },
};

export default themeModel;
