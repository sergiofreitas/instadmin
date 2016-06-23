import {inject} from 'aurelia-framework';
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

  details(item_id) {
    return this.router.navigateToRoute('entity_single', {entity: this.entity.key, id: item_id});
  }

  save(item) {
    return this.dispatcher.dispatch('entities.create', item);
  }

  update(id) {
    return this.dispatcher.dispatch('entities.update', {criteria: id, item: item});
  }

  destroy(id) {
    return this.dispatcher.dispatch('entities.destroy', id);
  }



  @handle('entities.*.start')
  lockUI(action, state) {
    this.loading = true;

    console.log('starting something', action);
  }

  @handle('entities.*.done')
  unlockUI(action, state) {
    this.loading = false;

    var refreshActions = [
      'entities.create.done',
      'entities.update.done',
      'entities.destroy.done'
    ];

    if ( refreshActions.indexOf(action) !== -1 ){
      this.dispatcher.dispatch('entities.fetch', 1);
    }

    console.log('called the action', action);
  }

  @handle('entities.*.error')
  errorUI(action, state) {
    console.log('an error occour', action, state);
  }

/*
  @handle('message.*') <-- use this for output all messages for client
  */
}
