
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
  // make a form that looks amazing!
}
