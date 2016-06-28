import 'trumbowyg';
import 'trumbowyg/dist/langs/pt.min';

export class FieldTextarea
{
  activate(data) {
    this.field = data;
  }

  attached(){
    if ( this.field.options && this.field.options.wysiwyg ){
      $(this.textarea).trumbowyg({
        lang: 'pt',
        autogrow: true,
        btns: [
            ['formatting'],
            'btnGrp-semantic',
            ['superscript', 'subscript'],
            ['link'],
            ['insertImage'],
            'btnGrp-justify',
            'btnGrp-lists',
            ['horizontalRule'],
            ['removeformat'],
            ['fullscreen']
        ]
      });
    }
  }
}
