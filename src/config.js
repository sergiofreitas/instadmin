
/*
  Configuration for env development
 */
var dev = {
  title: 'Skeleton',
  baseUrl: 'http://localhost:3000/api',
  providers: {}
};

/*
  Configuration for env production
 */
var prod = {
  title: 'Skeleton',
  baseUrl: 'http://example.com/api',
  providers: {}
};


var config = null;

if ( window.location.hostname == 'localhost' ){
  config = dev;
} else {
  config = prod;
}



export default config;
