
/*
  Configuration for env development
 */
var dev = {
  title: 'SINCEP',
  baseUrl: 'http://localhost:3000/api/',
  providers: {
    loginUrl: 'http://0.0.0.0:3000/api/Users/login'
  }
};

/*
  Configuration for env production
 */
var prod = {
  title: 'SINCEP',
  baseUrl: 'http://example.com/api/',
  providers: {
    loginUrl: 'http://0.0.0.0:3000/api/Users/login'
  }
};


var config = null;

if ( window.location.hostname == 'localhost' ){
  config = dev;
} else {
  config = prod;
}



export default config;
