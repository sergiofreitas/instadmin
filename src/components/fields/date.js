import {inject, bindable, bindingMode} from 'aurelia-framework';
import moment from 'moment';

@bindable('field')
@bindable({
  name: 'value',
  defaultBindingMode: bindingMode.twoWay
})
@inject(Element)
export class FieldDateCustomElement
{
  constructor(element) {
    this.element = element;
  }

  attached() {
    $(this.element).find('.ui.calendar').calendar(Object.assign({
      text: {
        days: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
        months: 'Janeiro_Fevereiro_Março_Abril_Maio_Junho_Julho_Agosto_Setembro_Outubro_Novembro_Dezembro'.split('_'),
        monthsShort: 'Jan_Fev_Mar_Abr_Mai_Jun_Jul_Ago_Set_Out_Nov_Dez'.split('_'),
        today: 'Hoje',
        now: 'Agora',
        am: 'AM',
        pm: 'PM'
      },
      onChange: (date) => { this.value = date; },
      formatter: {
        date: function(value){
          return moment(value).format('DD/MM/YYYY');
        },
        time: function(value){
          return moment(value).format('HH:mm');
        },
      },
/*      parser: {
        date: function(value){
          let dt = moment(value);

          if ( dt.isValid() ){
            return dt.toDate();
          } else {
            return null;
          }
        }
      }*/
    }, this.field.options));
  }
  // make a form that looks amazing!
}
