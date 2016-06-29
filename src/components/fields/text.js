import {inject, bindable, bindingMode} from 'aurelia-framework';

@bindable('field')
@bindable({
  name: 'value',
  defaultBindingMode: bindingMode.twoWay
})
@inject(Element)
export class FieldTextCustomElement
{
  constructor(element) {
      this.element = element;
  }
}
