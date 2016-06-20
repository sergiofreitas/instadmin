import {inject} from 'aurelia-framework';
import Entities from '../../entities/entities';
import {Dispatcher, handle} from 'aurelia-flux';
import {Router} from 'aurelia-router';


@inject(Dispatcher, Router, Entities)
export class EntityList {
  constructor(dispatcher, router, entities) {
      this.dispatcher = dispatcher;
      this.router = router;
      this.entities = entities;
  }

  activate(params){
    if ( !this.entities[params.entity] ){
      // show an error
      this.router.navigate('dashboard');
    }
  }
}
