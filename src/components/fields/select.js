
export class FieldSelect
{
  choices = [];

  activate(data){

    let list = data.choices;

    for(var i in list){
      if ( list.hasOwnProperty(i) ){
        this.choices.push({val: i, label: list[i]});
      }
    }


  }

  attached() {
    $('.ui.dropdown').dropdown();
  }
  // make a form that looks amazing!
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
