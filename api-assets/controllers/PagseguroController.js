module.exports = {};

// const { promisify } = require('util');
// const parseString = promisify(require('xml2js').parseString);

// const {
//   PAGSEGURO_API_URL,
//   PAGSEGURO_EMAIL,
//   PAGSEGURO_TOKEN,

// } = process.env;

// const http = require('axios').create({
//   baseURL: PAGSEGURO_API_URL,
//   timeout: 450000,
// });

// http.interceptors.response.use((response) => response, (error) => {
//   throw new Error(error.response.data);
// });

// const PagseguroController = {
//   generateLink: (payload) => http.post(
//     `/checkout?email=${PAGSEGURO_EMAIL}&token=${PAGSEGURO_TOKEN}`,
//     new URLSearchParams(payload).toString(),
//     {
//       headers: {
//         Accept: '*/*',
//         'Content-type': 'application/x-www-form-urlencoded',
//       },

//     },
//   ).then((response) => parseString(response.data)),
// };

// module.exports = PagseguroController;
