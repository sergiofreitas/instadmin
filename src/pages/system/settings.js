import {inject} from 'aurelia-framework';
import {Dispatcher, handle} from 'aurelia-flux';

@inject(Dispatcher)
export class Settings {
  constructor(dispatcher) {
      this.dispatcher = dispatcher;
  }

}
