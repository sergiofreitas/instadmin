
var entity = {
  name: 'Menus',
  transform: {
/*    from: function(resource) {
      return resource;
    },*/
/*    to: function(object){
      // transform object to send
    }*/
  },
  endpoint: {
    url: 'http://localhost:3000/api/menus/'
    /* put here additional parameters to send (like tokens and another things) */
  },
  columns: [
    {key: 'id', label: 'Id', type: 'text'},
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'route', label: 'Rota', type: 'text'},
    {key: 'icon', label: 'Ícone', type: 'text'},
    {key: 'order', label: 'Ordem', type: 'text'}
  ],
  fields: [
    {key: 'id', label: 'Id', type: 'text'},
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'route', label: 'Rota', type: 'text'},
    {key: 'icon', label: 'Ícone', type: 'text'},
    {key: 'order', label: 'Ordem', type: 'text'}
  ]
}

export default entity;
