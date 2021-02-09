import http from 'shared/http';

const pagseguroService = {
  generateLink: (payload) => http.post('/pagseguro/generateLink', payload),
};

export default pagseguroService;
