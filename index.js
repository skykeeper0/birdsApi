const port = process.env.PORT || 8080;
const Hapi = require('hapi');
const routes = require('./src/routes/routes').routes;

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port,
});

// register(...) registers a module within the instance of the API. Use to verify the incoming token.
server.register(require('hapi-auth-jwt'), (err) => {

  if (!err) {
    console.log('registered authentication provider');
  }

  server.auth.strategy('token', 'jwt', {
    key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

    verifyOptions: {
      algorithms: ['HS256'],
    },
  });

  routes.forEach((route) => {
    console.log(`attaching ${route.path}`);
    server.route(route);
  });
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});
