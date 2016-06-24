import 'semantic-ui';

import {config} from './config';
import Entities from './entities/entities';

export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .developmentLogging()
    .plugin('aurelia-flux')
    .plugin('aurelia-api', (config) => {
      for(var key in Entities) {
          if(Entities.hasOwnProperty(key)) {
            config.registerEndpoint(key, Entities[key].endpoint.url);
          }
      }
    })
    .plugin('aurelia-auth', (baseConfig) => {
      baseConfig.configure(config);
    })
    ;

  //Uncomment the line below to enable animation.
  //aurelia.use.plugin('aurelia-animator-css');
  //if the css animator is enabled, add swap-order="after" to all router-view elements

  //Anyone wanting to use HTMLImports to load views, will need to install the following plugin.
  //aurelia.use.plugin('aurelia-html-import-template-loader')

  aurelia.start().then(() => aurelia.setRoot());
}
