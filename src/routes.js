import {AuthorizeStep} from 'aurelia-auth';
import {inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import config from './config';

@inject(Router)
export class RouterConfig {

  constructor(router){
    this.router = router;
  }

  configure(){
    var appRouterConfig = function(route_config){
			route_config.title = config.title;
			route_config.addPipelineStep('authorize', AuthorizeStep);

      route_config.map([
        { route: ['', 'welcome'], name: 'welcome',      moduleId: 'pages/welcome',      nav: true, title: 'Welcome' },
        { route: 'users',         name: 'users',        moduleId: 'pages/users',        nav: true, title: 'Github Users' },
        { route: 'child-router',  name: 'child-router', moduleId: 'pages/child-router', nav: true, title: 'Child Router' }
      ]);
    }

    this.router.configure(appRouterConfig);
  }
}
