
var entity = {
  name: 'Palestrantes',
  transform: {
/*    from: function(resource) {
      return resource;
    },*/
/*    to: function(object){
      // transform object to send
    }*/
  },
  endpoint: {
    url: 'http://localhost:3000/api/speakers/'
    /* put here additional parameters to send (like tokens and another things) */
  },
  columns: [
    {key: 'name', label: 'Nome', type: 'text'},
    {key: 'role', label: 'Titulo', type: 'text'},
  ],
  fields: [
    {key: 'name', label: 'Nome', type: 'text'},
    {key: 'role', label: 'Titulo', type: 'text'},
    {key: 'avatar', label: 'Imagem', type: 'text'},
    {key: 'bio', label: "Biografia", type: 'textarea', options: {wysiwyg: true}},
    // put a relationship here
  ]
}

export default entity;