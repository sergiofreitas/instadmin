import {inject} from 'aurelia-framework';
import {Config} from 'aurelia-api';

@inject(Config)
export class Api {

  constructor(config) {
    this.config = config;
  }

  configure(key) {
    this.api = this.config.getEndpoint(key);
  }

  find(options) {
    var promise = new Promise(function(resolve){
      resolve([{id:1}, {id: 2}]);
    });

    return promise;

    return this.api.find('', options);
  }

  get(id) {
    return this.api.find(id);
  }

  post(object) {
    return this.api.post('', object);
  }

  update(criteria, object) {
    return this.api.update('', criteria, object);
  }

  destroy(id) {
    return this.api.destroy('', id);
  }
}
