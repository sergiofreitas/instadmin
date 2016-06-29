import 'trumbowyg';
import 'trumbowyg/dist/langs/pt.min';
import {inject, bindable, bindingMode} from 'aurelia-framework';

@bindable('field')
@bindable({
  name: 'value',
  defaultBindingMode: bindingMode.twoWay
})
@inject(Element)
export class FieldTextareaCustomElement
{
  constructor(element) {
      this.element = element;
  }

  activate(data) {
    this.field = data;
  }

  valueChanged(newValue) {
    $(this.textarea).trumbowyg('html', newValue);
  }

  attached(){
    if ( this.field.options && this.field.options.wysiwyg ){
      $(this.textarea).trumbowyg({
        lang: 'pt',
        autogrow: true
      }).on('tbwblur', (e) => {
        this.value = e.target.value;
      });
    }
  }

  detached() {
    $(this.textarea).trumbowyg('destroy');
  }
}
