import axios from 'axios';

const zipcodeService = {
  fetch: (code) => axios
    .get(`https://viacep.com.br/ws/${code}/json/`)
    .then((response) => response.data),
};

export default zipcodeService;
