import {customElement, bindable, bindingMode} from 'aurelia-framework';

@customElement('form-builder')
@bindable('schema')
@bindable({
  name: 'model',
  defaultBindingMode: bindingMode.twoWay
})
export class FormBuilder
{
  fields = [];
  bind() {
    this.schema.map(f => {

      // define the template
      f.template = this.setTemplate(f);
      this.fields.push(f);
    });

    console.log(this.schema, this.model);
  }

  setTemplate(field){
    return './fields/'+field.type;
  }

  // make a form that looks amazing!
}

export class JsonValueConverter {
    toView(value) {
        return JSON.stringify(value, null, "\t");
    }
}
