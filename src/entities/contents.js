
var entity = {
  name: 'Páginas',
  transform: {
/*    from: function(resource) {
      return resource;
    },*/
/*    to: function(object){
      // transform object to send
    }*/
  },
  endpoint: {
    url: 'http://localhost:3000/api/contents/'
    /* put here additional parameters to send (like tokens and another things) */
  },
  columns: [
    {key: 'id', label: 'Id', type: 'text'},
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'type', label: 'Tipo', type: 'text'},
    {key: 'status', label: 'Status', type: 'select', options: {choices: {'published': 'Publicado', 'draft': 'Rascunho'}}}
  ],
  fields: [
    {key: 'id', label: 'Id', type: 'text'},
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'link', label: 'Link de Referência', type: 'text'},
    {key: 'thumbnail', label:'Imagem', type: 'text'}, //change to image upload
    {key: 'intro', label: 'Introdução', type: 'textarea'},
    {key: 'text', label: 'Conteúdo', type: 'textarea', options: {wysiwyg: true}},
    {key: 'type', label: 'Tipo', type: 'select', choices: {
      'expositores': 'expositores',
      'page': 'page',
      'noticias': 'noticias',
      'patrocinadores': 'patrocinadores',
      'videos': 'videos'
    }},
    {key: 'status', label: 'Status', type: 'select', choices: {
      'draft': 'draft',
      'published': 'published'
    }}
  ]
}

export default entity;
