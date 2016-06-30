import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {Config} from 'aurelia-api';
import moment from 'moment';

@inject(Dispatcher, Config)
export class EventStore {
  _items = [];
  _item = null;
  _filters = {};

  constructor(dispatcher, api) {
    this.dispatcher = dispatcher
    this.api = api.getEndpoint('events');
  }

  get items() {
    return this._items;
  }

  get item() {
    return this._item;
  }

  get filters() {
    return this._filters;
  }

  transformTo(item) {
    return item;
  }

  @handle('event.fetch')
  getItems(action, options) {
    this.dispatcher.dispatch('event.fetch.start');

    return this.api.find('', {filter: this.filters})
      .then(items => {
        this._items = items;
        this.dispatcher.dispatch('event.fetch.done', items);
      }).catch(err => {
        this.dispatcher.dispatch('event.fetch.error', err);
      });
  }

  @handle('event.get')
  getItem(action, item) {
    this.dispatcher.dispatch('event.get.start');

    return this.api.find(item)
      .then(response => {
        this._item = response;
        this.dispatcher.dispatch('event.get.done', this._item);
      }).catch(err => {
        this.dispatcher.dispatch('event.get.error', err);
      });

/*    if ( this._item ){
      this.dispatcher.dispatch('event.get.done', this._item);
    } else {
      return this.api.get(item)
        .then(response => {
          this._item = response;
          this.dispatcher.dispatch('event.get.done', this._item);
        }).catch(err => {
          this.dispatcher.dispatch('event.get.error', err);
        });
    }*/
  }

  @handle('event.filter')
  defineFilter(action, filters) {
    this._filters = filters;
  }

  @handle('event.create')
  createItem(action, item) {
    this.dispatcher.dispatch('event.create.start');

    item = this.transformTo(item);

    return this.api.post('', item)
      .then(response => {
        this.dispatcher.dispatch('event.create.done', response);
      })
      .catch(err => {
        this.dispatcher.dispatch('event.create.error', err);
      });
  }

  @handle('event.update')
  editItem(action, payload){
    this.dispatcher.dispatch('event.update.start');

    payload.item = this.transformTo(payload.item);

    return this.api.update('', payload.criteria, payload.item)
      .then(response => {
        this.dispatcher.dispatch('event.update.done', response);
      })
      .catch(err => {
        this.dispatcher.dispatch('event.update.error', err);
      });
  }

  @handle('event.destroy')
  destroyItem(action, item){
    this.dispatcher.dispatch('event.destroy.start');
    // send data to server
    return this.api.destroy('', item)
      .then(response => {
        this.dispatcher.dispatch('event.destroy.done', response);
      })
      .catch(err => {
        this.dispatcher.dispatch('event.destroy.error', err);
      });
  }

/*  @handle('entity.load') */
}
