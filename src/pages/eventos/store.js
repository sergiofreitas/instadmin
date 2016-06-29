import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';
import {Api} from './api';

@inject(Dispatcher, Api)
export class EventStore {
  _items = [];
  _item = null;
  _filters = {};

  constructor(dispatcher, api) {
    this.dispatcher = dispatcher
    this.api = api;
    this.api.configure('events');
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

  @handle('entities.fetch')
  getItems(action, options) {
    this.dispatcher.dispatch('entities.fetch.start');

    return this.api.find({filter: this.filters})
      .then(items => {
        this._items = items;
        this.dispatcher.dispatch('entities.fetch.done', items);
      }).catch(err => {
        this.dispatcher.dispatch('entities.fetch.error', err);
      });
  }

  @handle('entities.get')
  getItem(action, item) {
    this.dispatcher.dispatch('entities.get.start');

    return this.api.get(item)
      .then(response => {
        this._item = response;
        this.dispatcher.dispatch('entities.get.done', this._item);
      }).catch(err => {
        this.dispatcher.dispatch('entities.get.error', err);
      });

/*    if ( this._item ){
      this.dispatcher.dispatch('entities.get.done', this._item);
    } else {
      return this.api.get(item)
        .then(response => {
          this._item = response;
          this.dispatcher.dispatch('entities.get.done', this._item);
        }).catch(err => {
          this.dispatcher.dispatch('entities.get.error', err);
        });
    }*/
  }

  @handle('entities.filter')
  defineFilter(action, filters) {
    this._filters = filters;
  }

  @handle('entities.create')
  createItem(action, item) {
    this.dispatcher.dispatch('entities.create.start');
    // send data to server
    return this.api.post(item)
      .then(response => {
        this.dispatcher.dispatch('entities.create.done', response);
      })
      .catch(err => {
        this.dispatcher.dispatch('entities.create.error', err);
      });
  }

  @handle('entities.update')
  editItem(action, payload){
    this.dispatcher.dispatch('entities.update.start');
    // send data to server
    return this.api.update(payload.criteria, payload.item)
      .then(response => {
        this.dispatcher.dispatch('entities.update.done', response);
      })
      .catch(err => {
        this.dispatcher.dispatch('entities.update.error', err);
      });
  }

  @handle('entities.destroy')
  destroyItem(action, item){
    this.dispatcher.dispatch('entities.destroy.start');
    // send data to server
    return this.api.destroy(item)
      .then(response => {
        this.dispatcher.dispatch('entities.destroy.done', response);
      })
      .catch(err => {
        this.dispatcher.dispatch('entities.destroy.error', err);
      });
  }

/*  @handle('entity.load') */
}
