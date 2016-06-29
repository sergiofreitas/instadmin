import {inject, BindingEngine} from 'aurelia-framework';
import moment from 'moment';

@inject(BindingEngine)
export class FieldDate
{
  constructor(bindingEngine) {
    this.value = '';

    let subscription = bindingEngine.propertyObserver(this, 'value')
      .subscribe((newValue, oldValue) => this.field.model[this.field.key] = newValue);

  }

  activate(data) {
    this.field = data;
    console.log(this.field.model);
  }

  attached() {
    $('.ui.calendar').calendar(Object.assign({
      text: {
        days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        today: 'Hoje',
        now: 'Agora',
        am: 'AM',
        pm: 'PM'
      },
      formatter: {
        date: function(value){
          return moment(value).format('DD/MM/YYYY');
        },
        time: function(value){
          return moment(value).format('HH:mm');
        },
      },
      parser: {
        date: function(value){
          let dt = moment(value);

          if ( dt.isValid() ){
            return dt.toDate();
          } else {
            return null;
          }
        }
      }
    }, this.field.options));
  }
  // make a form that looks amazing!
}
