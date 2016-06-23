import {inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';

@inject(Config)
export class Api {

  constructor(config) {
    this.config = config;
  }

  configure(entity) {
    this.entity = entity;
    this.api = this.config.getEndpoint(entity.key);
  }

  find(options) {
    let fn = this.entity.transform.from || function(r){ return r; };
    return this.api.find('', options).then(fn);
  }

  get(id) {
    let fn = this.entity.transform.from || function(r){ return r; };
    return this.api.find(id).then(fn);
  }

  post(object) {
    let fn = this.entity.transform.to || function(r){ return r; };
    return this.api.post('', object).then(fn);
  }

  update(criteria, object) {
    let fn = this.entity.transform.to || function(r){ return r; };
    return this.api.update('', criteria, object).then(fn);
  }

  destroy(id) {
    return this.api.destroy('', id);
  }
}
