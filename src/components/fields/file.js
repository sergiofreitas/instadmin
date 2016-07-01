import {inject, bindable, bindingMode} from 'aurelia-framework';

@bindable('field')
@bindable({
  name: 'value',
  defaultBindingMode: bindingMode.twoWay
})
@inject(Element)
export class FieldFileCustomElement
{
  constructor(element) {
      this.element = element;
  }

  attached() {
    var self = this;
    $(this.visual).on('click', function(){
      $(self.file).click();
    });

    $(this.button).on('click', function(e){
      $(self.file).click();
    });

    $(this.file).on('change', function(e){
      var name = e.target.files[0].name;
      $(self.visual).val(name);
    });
  }
}
