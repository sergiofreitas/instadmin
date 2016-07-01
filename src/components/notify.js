import {customElement, inject} from 'aurelia-framework';
import {handle} from 'aurelia-flux';

@customElement('notify')
export class Notify
{
  show = false;
  type = '';
  message = '';

  close() {
    this.show = false;
  }

  @handle('*.create.done')
  @handle('*.update.done')
  @handle('*.destroy.done')
  showSuccess() {
    this.show = true;
    this.type = 'success';
    this.message = 'Operação realizada com sucesso';

    console.log('ta vindo pra ca')

    setTimeout(() => {this.close()}, 3500);
  }
}
