
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
    url: 'http://localhost:3000/clients'
  },
  columns: [
    {key: 'id', label: 'Id', type: 'text'},
    {key: 'name', label: 'Nome', type: 'text'},
    {key: 'description', label: 'Descrição', type: 'text'},
  ]
}

export default entity;
