import {inject} from 'aurelia-framework';
import Entities from '../../entities/entities';
import {Dispatcher, handle} from 'aurelia-flux';
import {Router} from 'aurelia-router';
import {EntityStore} from './store';


@inject(Dispatcher, Router, EntityStore)
export class EntityList {
  entity = null;
  rows = [];

  constructor(dispatcher, router, store) {
      this.dispatcher = dispatcher;
      this.router = router;
      this.store = store;
      this.selectedRows = [];
  }

  activate(params) {
    this.entity = this.store.configure(params.entity);
    if ( !this.entity ){
      console.log('notify error');
      this.router.navigate('dashboard');
    }

    return this.loadPage(1);
  }

  loadPage(page) {
    return this.dispatcher.dispatch('entities.fetch', page);
  }

  save(item) {
    return this.dispatcher.dispatch('entities.create', item);
  }

  @handle('entities.lock')
  lockUI(action, state) {
    this.loading = true;

    if ( state && state.message ){
      console.log(state);
    }
  }

  @handle('entities.unlock')
  unlockUI(action, state) {
    this.loading = false;

    if ( state && state.message ){
      console.log(state);
    }
  }

/*
  @handle('message.*') <-- use this for output all messages for client
  */
}

export class JsonValueConverter {
    toView(value) {
        return JSON.stringify(value, null, "\t");
    }
}
