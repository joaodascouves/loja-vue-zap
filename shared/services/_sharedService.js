import http from 'shared/http';

export default class Service {
  constructor(name) {
    this.name = name;
  }

  makeRoute(path) {
    const separator = this.name.indexOf('/') !== -1 ? '_' : '/';
    return `${this.name}${separator}${path}`;
  }

  post(route, payload) {
    return http.post(this.makeRoute(route), payload);
  }

  get(route) {
    return http.get(this.makeRoute(route));
  }
}
