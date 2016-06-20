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
        { route: 'entity/:entity',   name: 'entity_list',      moduleId: 'pages/entity/list',      nav: false },
        { route: 'entity/:entity/:id',   name: 'entity_single',      moduleId: 'pages/entity/single',      nav: false },
        { route: ['', 'dashboard'], name: 'dashboard',      moduleId: 'pages/dashboard/index',      nav: true, title: 'Dashboard' },
        { route: 'settings', name: 'settings',      moduleId: 'pages/system/settings',      nav: true, title: 'Settings' }
      ]);
    }

    this.router.configure(appRouterConfig);
  }
}
