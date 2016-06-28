
export class FieldText
{
  activate(data) {
/*    this.field = data.field;
    this.model = data.model;*/
  }
  // make a form that looks amazing!
}

export class JsonValueConverter {
    toView(value) {
        return JSON.stringify(value, null, "\t");
    }
}
