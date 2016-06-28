import {bindable} from 'aurelia-framework';
import {inject} from 'aurelia-framework';
import {AuthService} from 'aurelia-auth';
import {BindingEngine} from 'aurelia-framework';
import Entities from '../entities/entities';

@inject(AuthService, BindingEngine, Entities)
export class NavBar {
    _isAuthenticated = false;
    displayName = "";
    @bindable router = null;
    subscription = {};
    constructor(auth, bindingEngine, entities) {
        this.auth = auth;
        this.bindingEngine = bindingEngine;
        this._isAuthenticated = this.auth.isAuthenticated();
        this.subscription = bindingEngine.propertyObserver(this, 'isAuthenticated')
            .subscribe((newValue, oldValue) => {
                if (this.isAuthenticated) {
                    this.auth.getMe().then(data => {
                        return this.displayName = data.displayName;
                    });
                }
            });

        this.entities = [];
        for( var i in entities ) {
          if ( entities.hasOwnProperty(i) ){
            let entity = entities[i];
            entity.key = i;
            this.entities.push(entity);
          }
        }
    }

    get isAuthenticated() {
        return this.auth.isAuthenticated();
    }

    deactivate() {
        this.subscription.dispose();
    }

}
