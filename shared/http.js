import axios from 'axios';
import axiosRetry from 'axios-retry';

import { apiURL } from 'config';

import storageService from './services/storageService';

const instance = axios.create({
  baseURL: apiURL,
  timeout: 100000,
});

axiosRetry(instance, {
  retries: 3,
  retryCondition: (error) => !error.response || parseInt(error.response.status) > 500,
});

instance.interceptors.request.use((config) => {
  const token = storageService.get('auth:token');
  const clientId = storageService.get('clientId');

  if (token !== null) {
    Object.assign(config, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  if (clientId !== null) {
    Object.assign(config, {
      params: {
        clientId,
      },
    });
  } else {
    console.log(localStorage);
  }

  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data && response.data._message) {
      //
    }

    return response;
  },
  (error) => {
    if (!error) {
      throw new Error('Erro genérico ao se conectar');
    }

    if (error.response && error.response.status === 401) {
      if (storageService.get('auth:token')) {
        storageService.remove('auth:token');
        _router.push({ path: '/auth/signin' });
      }
    }

    let { message } = error;

    if (error.response && error.response.data && error.response.data._message) {
      message = error.response.data._message;
    }

    throw message;
  },
);

export default instance;
