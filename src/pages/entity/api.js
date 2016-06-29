import {inject} from 'aurelia-framework';
import {Config, Endpoint} from 'aurelia-api';

@inject(Config, Endpoint.of('events'))
export class Api {

  constructor(config, events) {
    this.config = config;
    this.events = events;
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
