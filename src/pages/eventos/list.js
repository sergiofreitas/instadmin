import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {Router} from 'aurelia-router';
import {EventStore} from './store';
import moment from 'moment';


@inject(Dispatcher, Router, EventStore)
export class EventList {
  entity = null;
  rows = [];

  constructor(dispatcher, router, store) {
      this.dispatcher = dispatcher;
      this.router = router;
      this.store = store;
      this.selectedRows = [];
  }

  activate(params) {
    return this.loadPage(1);
  }

  attached() {
    // sortable stuff
  }

  loadPage(page) {
    return this.dispatcher.dispatch('event.fetch', page);
  }

  details(item_id) {
    return this.router.navigateToRoute('event_single', {id: item_id});
  }

  destroy(id) {
    return this.dispatcher.dispatch('event.destroy', id);
  }



  @handle('event.*.start')
  lockUI(action, state) {
    this.loading = true;

    console.log('starting something', action);
  }

  @handle('event.*.done')
  unlockUI(action, state) {
    this.loading = false;

    var refreshActions = [
      'event.create.done',
      'event.update.done',
      'event.destroy.done'
    ];

    if ( refreshActions.indexOf(action) !== -1 ){
      this.dispatcher.dispatch('event.fetch', 1);
    }

    console.log('called the action', action);
  }

  @handle('event.*.error')
  errorUI(action, state) {
    console.log('an error occour', action, state);
  }

/*
  @handle('message.*') <-- use this for output all messages for client
  */
}

export class DateValueConverter {
  toView(value, format) {
    return moment(value).format(format);
  }
}
