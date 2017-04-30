const Knex = require('./knex');
const port = process.env.PORT || 8080;

// app.use(bodyParser.json());
const Hapi = require('hapi');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port,
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler(request, reply) {
    return reply('hello world');
  },
});

// Start the server
server.start((err) => {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

// register(...) registers a module within the instance of the API
server.register(require('hapi-auth-jwt'), (err) => {
  server.auth.strategy('token', 'jwt', {
    key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

    verifyOptions: {
      algorithms: ['HS256'],
    },
  });
});

// adding get /birds route
server.route({
  path: '/birds',
  method: 'GET',
  handler: (request, reply) => {
    const getOperation = Knex('birdbase').where({

      isPublic: true,

    }).select('name', 'species', 'picture_url').then((results) => {
      if (!results || results.length === 0) {
        reply({
          error: true,
          errMessage: 'no public bird found',
        });
      }

      reply({

        dataCount: results.length,
        data: results,

      });
    }).catch((err) => {
      reply('server-side error');
    });
  },
});

