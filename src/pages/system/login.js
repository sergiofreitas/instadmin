import {AuthService} from 'aurelia-auth';
import {inject} from 'aurelia-framework';

@inject(AuthService)
export class Login {
  message = null;

  constructor(authService) {
    this.auth = authService;
  }

  activate() {
    $('body').addClass('login-page');
  }

  canDeactivate() {
    $('body').removeClass('login-page');
  }

  login() {
    var self = this;

    return this.auth.login(this.email, this.password).then(response => {
      console.log('logged');
    }).catch(err=>{
      err.json().then(function(e){
        self.message = e.message;
      })
    });
  }
}
