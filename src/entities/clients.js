
var entity = {
  name: 'Clientes',
  transform: {
/*    from: function(resource) {
      return resource;
    },*/
/*    to: function(object){
      // transform object to send
    }*/
  },
  endpoint: {
    url: 'http://localhost:3000/api/eventos/'
    /* put here additional parameters to send (like tokens and another things) */
  },
  columns: [
    {key: 'id', label: 'Id', type: 'text'},
    {key: 'name', label: 'Nome', type: 'text'},
    {key: 'logo', label: 'Logo', type: 'text'},
    {key: 'start', label: 'Inicio', type: 'text'},
    {key: 'end', label: 'Fim', type: 'text'}
  ],
  fields: [
    {key: 'name', label: 'Nome', type: 'text', options: {}},
  ]
}

export default entity;
