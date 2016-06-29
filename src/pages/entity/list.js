import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {Router} from 'aurelia-router';
import {EntityStore} from './store';
import moment from 'moment';


@inject(Dispatcher, Router, EntityStore)
export class EntityList {
  entity = null;
  activeEvent = null;
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

    return this.dispatcher.dispatch('entities.init');
  }

  attached() {
    // sortable stuff
  }

  loadPage() {
    return this.dispatcher.dispatch('entities.fetch');
  }

  details(item_id) {
    return this.router.navigateToRoute('entity_single', {entity: this.entity.key, id: item_id});
  }

  destroy(id) {
    return this.dispatcher.dispatch('entities.destroy', id);
  }

  changeEvent(event) {
    var filter = {
      where: {
        eventId: event.id
      }
    };
    this.activeEvent = event;
    return this.dispatcher.dispatch('entities.filter', filter);
  }


  @handle('entities.init.done')
  loadList() {
    this.changeEvent(this.store.events[0]);
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

export class TransformValueConverter {
  conversions = {
    text: function(value, column) {
      if ( value && column.options && column.options.maxlength ){
          value = value.replace(/(<([^>]+)>)/ig,"");
          let truncated = value.substring(0, column.options.maxlength);
          if ( truncated != value ) {
            truncated += '...';
          }
          return truncated;
      }
      return value;
    },
    image: function(value){
      return '<img src="'+value+'"/>';
    },
    select: function(value, column){
      return column.options.choices[value] || value;
    },
    date: function(value, column) {
      return moment(value).format(column.options.format);
    }
  };

  toView(value, column) {
    return this.conversions[column.type](value, column);
  }
}
