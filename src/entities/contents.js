
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
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'type', label: 'Tipo', type: 'text'},
    {key: 'status', label: 'Status', type: 'select', options: {choices: {'published': 'Publicado', 'draft': 'Rascunho'}}}
  ],
  fields: [
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'link', label: 'Link de Referência', type: 'text'},
    {key: 'thumbnail', label:'Imagem', type: 'text'}, //change to image upload
    {key: 'intro', label: 'Introdução', type: 'textarea'},
    {key: 'text', label: 'Conteúdo', type: 'textarea', options: {wysiwyg: true}},
    {key: 'type', label: 'Tipo', type: 'select', choices: {
      'expositores': 'Expositores',
      'page': 'Page',
      'noticias': 'Notícias',
      'patrocinadores': 'Patrocinadores',
      'videos': 'Vídeos'
    }},
    {key: 'eventId', label: 'Evento', type: 'select', remote: {endpoint: 'events', label: 'name'}},
    {key: 'status', label: 'Status', type: 'select', choices: {
      'draft': 'Rascunho',
      'published': 'Publicado'
    }}
  ]
}

export default entity;
