export default {
  methods: {
    currencyFormat(value) {
      return `R$ ${parseFloat(value).toFixed(2)}`;
    },
    localDateFormat(value) {
      return new Date(value).toLocaleString('pt-BR', { timeZone: 'UTC' });
    },
  },
};
