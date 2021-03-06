
var entity = {
  name: 'Programação',
  transform: {
/*    from: function(resource) {
      return resource;
    },*/
    to: function(object){
      console.log('log no to', object);

    }
  },
  endpoint: {
    url: 'http://localhost:3000/api/sessions/'
    /* put here additional parameters to send (like tokens and another things) */
  },
  columns: [
    {key: 'date', label: 'Data', type: 'date', options: {format: 'DD/MM/YYYY HH:mm'}},
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'description', label: 'Descrição', type: 'text', options: {maxlength: 50}},
  ],
  fields: [
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'date', label: 'Data', type: 'date'},
    {key: 'description', label: "Descrição", type: 'textarea'},
    {key: 'eventId', label: 'Evento', type: 'select', remote: {endpoint: 'events', label: 'name'}},
  ]
}

export default entity;
