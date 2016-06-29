import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {Router} from 'aurelia-router';
import {EntityStore} from './store';


@inject(Dispatcher, Router, EntityStore)
export class EntitySingle {
  entity = null;
  isNew = false;
  item = {};

  constructor(dispatcher, router, store) {
    this.dispatcher = dispatcher;
    this.router = router;
    this.store = store;
  }

  activate(params) {
    this.entity = this.store.configure(params.entity);
    if ( !this.entity ){
      console.log('notify error');
      this.router.navigate('dashboard');
    }

    if ( params.id !== 'create' ){
      return this.dispatcher.dispatch('entities.get', params.id);
    } else {
      this.isNew = true;
    }
  }

  cancel() {
    return this.router.navigateToRoute('entity_list', {entity: this.entity.key});
  }

  save() {
    if (this.isNew) {
      return this.dispatcher.dispatch('entities.create', this.item);
    } else {
      return this.dispatcher.dispatch('entities.update', {criteria: this.item.id, item: this.item});
    }
  }

  @handle('entities.*.start')
  lockUI(action, state) {
    this.loading = true;

    // iniciando o envio de dados
    // caso queira mostrar alguma informacao, utilize o action
  }

  @handle('entities.get.done')
  populate(action, state){
    this.item = state;
  }

  @handle('entities.*.done')
  unlockUI(action, state) {
    this.loading = false;

    var refreshActions = [
      'entities.create.done',
      'entities.update.done',
      'entities.destroy.done'
    ];

    console.log('called the action', action, state);

    if ( refreshActions.indexOf(action) !== -1 ){
      return this.router.navigateToRoute('entity_list', {entity: this.entity.key});
    }
  }

  @handle('entities.*.error')
  errorUI(action, state) {
    this.loading = false;

    console.log('an error occour', action, state);
    return this.router.navigateToRoute('entity_list', {entity: this.entity.key});
  }
}
