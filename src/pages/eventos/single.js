import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {Router} from 'aurelia-router';
import {EventStore} from './store';

@inject(Dispatcher, Router, EventStore)
export class EventSingle {
  entity = null;
  isNew = false;
  item = {};

  constructor(dispatcher, router, store) {
    this.dispatcher = dispatcher;
    this.router = router;
    this.store = store;
    this.fields = [
      {key: 'name', label: 'Nome', type: 'text'},
      {key: 'avatar', label: 'Imagem', type: 'text'},
      {key: 'start', label: 'Inicio', type: 'text', options: {type: 'date'}},
      {key: 'end', label: 'Fim', type: 'text', options: {type: 'date'}},
      {key: 'description', label: 'Descrição', type: 'textarea'},
      {key: 'status', label: 'Status', type: 'select', choices: {
        'draft': 'draft',
        'published': 'published'
      }}
    ]

    this.fields.map(f => {
      this.item[f.key] = '';
    });
  }

  activate(params) {
    if ( params.id !== 'create' ){
      return this.dispatcher.dispatch('event.get', params.id);
    } else {
      this.isNew = true;
    }
  }

  cancel() {
    return this.router.navigateToRoute('event_list');
  }

  save() {
    if (this.isNew) {
      return this.dispatcher.dispatch('event.create', this.item);
    } else {
      return this.dispatcher.dispatch('event.update', {criteria: this.item.id, item: this.item});
    }
  }

  @handle('event.*.start')
  lockUI(action, state) {
    this.loading = true;

    // iniciando o envio de dados
    // caso queira mostrar alguma informacao, utilize o action
  }

  @handle('event.get.done')
  populate(action, state){
    this.item = state;
  }

  @handle('event.*.done')
  unlockUI(action, state) {
    this.loading = false;

    var refreshActions = [
      'event.create.done',
      'event.update.done',
      'event.destroy.done'
    ];

    console.log('called the action', action, state);

    if ( refreshActions.indexOf(action) !== -1 ){
      return this.router.navigateToRoute('event_list');
    }
  }

  @handle('event.*.error')
  errorUI(action, state) {
    this.loading = false;

    console.log('an error occour', action, state);
    return this.router.navigateToRoute('event_list');
  }
}
