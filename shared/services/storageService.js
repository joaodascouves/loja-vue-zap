import { storagePrefix } from 'config';

function keyName(name) {
  return `${storagePrefix}:${name}`;
}

const storageService = {
  save: (key, value) => localStorage.setItem(keyName(key), value),
  get: (key) => localStorage.getItem(keyName(key)),
  remove: (key) => localStorage.removeItem(keyName(key)),
};

export default storageService;
