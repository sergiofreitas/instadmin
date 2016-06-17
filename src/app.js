import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {RouterConfig} from './routes';
import {FetchConfig} from 'aurelia-auth';


@inject(Router, FetchConfig, RouterConfig)
export class App {

  constructor(router, fetchConfig, routerConfig){
    this.router = router;
    this.fetchConfig = fetchConfig;
    this.routerConfig = routerConfig;
  }

  activate() {
      this.routerConfig.configure();
      this.fetchConfig.configure();
  }
}
