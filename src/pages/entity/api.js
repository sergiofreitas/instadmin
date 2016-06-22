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

  post(object) {

  }
}
