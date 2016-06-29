import {customElement, bindable, bindingMode} from 'aurelia-framework';

@customElement('form-builder')
@bindable('schema')
@bindable({
  name: 'model',
  defaultBindingMode: bindingMode.twoWay
})
export class FormBuilder
{
  modelChanged() {
    console.log('model changed');
  }
}

export class FieldValueConverter {
  toView(value, attr) {
    return value[attr];
  }
}
