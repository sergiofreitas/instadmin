import {inject} from 'aurelia-framework';
import Entities from '../../entities/entities';
import {Dispatcher, handle} from 'aurelia-flux';
import {Api} from './api';

@inject(Dispatcher, Entities, Api)
export class EntityStore {
  _items = [];
  _filters = new Map();

  constructor(dispatcher, entities, api) {
    this.dispatcher = dispatcher
    this.entities = entities;
    this.api = api;
  }

  configure(key) {
    // return if the configuration is ok
    if ( !this.entities[key] ){
      return false;
    }

    this.entity = this.entities[key];
    this.entity.key = key;
    this.api.configure(this.entity);
    return this.entity;
  }

  get items() {
    return this._items;
  }

  fetch(page) {
    this.dispatcher.dispatch('entities.lock');

    // use the filter defined
    return this.api.find({page: page})
      .then(items => {
        this._items = items;
        this.dispatcher.dispatch('entities.unlock');
      });
  }

  @handle('entities.fetch')
  getItems(action, options) {
    return this.fetch(options);
  }

  @handle('entities.filter')
  defineFilter(action, filters) {
    //define the filter
  }

  @handle('entities.create')
  createItem(action, item) {
    this.dispatcher.dispatch('entities.lock', {message: 'enviando dados ao servidor', type: 'info'});
    // send data to server
    this.dispatcher.dispatch('entities.unlock', {message: 'registro salvo com sucerro', type: 'success'});
  }

  @handle('entities.edit')
  editItem(action, item){
    this.dispatcher.dispatch('entities.lock', {message: 'enviando dados ao servidor', type: 'info'});
    // send data to server
    this.dispatcher.dispatch('entities.unlock', {message: 'registro salvo com sucerro', type: 'success'});
  }

  @handle('entities.destroy')
  destroyItem(action, item){
    this.dispatcher.dispatch('entities.lock', {message: 'enviando dados ao servidor', type: 'info'});
    // send data to server
    this.dispatcher.dispatch('entities.unlock', {message: 'registro salvo com sucerro', type: 'success'});
  }

/*  @handle('entity.load')

  @handle('entity.edit')*/
}
