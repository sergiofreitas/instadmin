import {inject, bindable, bindingMode, BindingEngine} from 'aurelia-framework';
import {Config} from 'aurelia-api';

@bindable('field')
@bindable({
  name: 'value',
  defaultBindingMode: bindingMode.twoWay
})
@inject(Element, Config, BindingEngine)
export class FieldSelectCustomElement
{
  choices = [];
  subscription = null;

  constructor(element, config, bindingEngine) {
      this.element = element;
      this.api_config = config;
      var self = this;
      this.subscription = bindingEngine.propertyObserver(this, 'choices')
         .subscribe((newValue, oldValue) => {
           setTimeout(function(){
             $(self.element).find('.ui.dropdown').dropdown('set selected', self.value);
           }, 50);
         });
  }

  valueChanged(newValue) {
    $(this.element).find('.ui.dropdown').dropdown('set selected', newValue);
  }

  bind(){
    if ( this.field.choices ){
      this.bindChoices();
    } else {
      this.bindRemote();
    }
  }

  bindChoices() {
    let list = this.field.choices;

    for(var i in list){
      if ( list.hasOwnProperty(i) ){
        this.choices.push({val: i, label: list[i]});
      }
    }
    console.log(this.choices);
  }

  bindRemote() {
    let api = this.api_config.getEndpoint(this.field.remote.endpoint),
        label = this.field.remote.label;

    api.find('')
      .then(items => {
        this.choices = items.map((i) => {
          return {val: i.id, label: i[label]};
        });

        console.log(this.choices);
      });
  }

  attached() {
    if ( this.field.multiple ){
      $(this.element).find('select').attr('multiple', 'multiple');
    }
    
    $(this.element).find('.ui.dropdown').dropdown({
      onChange: (v) => {
        if ( this.value != v ){
          this.value = v;
        }
      }
    });
  }

  detached() {
    this.subscription.dispose();
  }
}


export class ToStringValueConverter {
  toView(value) {
    if ( value ){
      return value.toString();
    } else {
      return value;
    }
  }
}
