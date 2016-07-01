
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
    {key: 'title', label: 'Titulo', type: 'text'},
    {key: 'icon', label: 'Ícone', type: 'text'},
    {key: 'order', label: 'Ordem', type: 'text'},
    {key: 'status', label: 'Status', type: 'select', options: {choices: {'published': 'Publicado', 'draft': 'Rascunho'}}}
  ],
  fields: [
    {key: 'title', label: 'Titulo', type: 'text'},
    /*{key: 'route', label: 'Rota', type: 'text'},*/
    {key: 'route', label: 'Tipo', type: 'select', choices: {
      "root.notes()": "Anotações",
      "root.single({id:'em-breve-expositores'})": 'Expositores',
      "root.single({id: 'inicio'})": 'Inicio',
      "root.profile()": "Login",
      "root.agenda()": "Minha Agenda",
      "root.single({id: 'em-breve-noticias'})": 'Notícias',
      "root.single({id: 'o-evento'})": 'O Evento',
      "root.single({id: 'o-sincep'})": 'O Sincep',
      "root.speakers()": "Palestrantes",
      "root.participants()": "Participantes",
      "root.single({id: 'em-breve-patrocinadores'})": "Patrocinadores",
      "root.session()": "Programação",
      "root.single({id: 'em-breve-videos'})": "Vídeos"
    }},
    {key: 'icon', label: 'Ícone', type: 'select', choices: {
      'icon-agenda': 'Agenda',
      'icon-anotacoes': 'Anotações',
      'icon-usuario': 'Cadastro',
      'icon-evento': 'Evento',
      'icon-expositores': 'Expositores',
      'icon-home': 'Home',
      'icon-noticias': 'Notícias',
      'icon-palestrantes': 'Palestrantes',
      'icon-participantes': 'Participantes',
      'icon-patrocinadores': 'Patrocinadores',
      'icon-programacao': 'Programação',
      'icon-sincep': 'Sincep',
      'icon-videos': 'Vídeos'
    }},

    {key: 'order', label: 'Ordem', type: 'text'},
    {key: 'eventId', label: 'Evento', type: 'select', remote: {endpoint: 'events', label: 'name'}},
    {key: 'status', label: 'Status', type: 'select', choices: {
      'draft': 'Rascunho',
      'published': 'Publicado'
    }}
  ]
}

export default entity;
