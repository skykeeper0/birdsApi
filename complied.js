'use strict';

var Knex = require('./knex');
var port = process.env.PORT || 8080;

// app.use(bodyParser.json());
var Hapi = require('hapi');

// Create a server with a host and port
var server = new Hapi.Server();
server.connection({
  host: 'localhost',
  port: port
});

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function handler(request, reply) {
    return reply('hello world');
  }
});

// Start the server
server.start(function (err) {
  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

// register(...) registers a module within the instance of the API
server.register(require('hapi-auth-jwt'), function (err) {
  server.auth.strategy('token', 'jwt', {
    key: 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy',

    verifyOptions: {
      algorithms: ['HS256']
    }
  });
});

// adding get /birds route
server.route({
  path: '/birds',
  method: 'GET',
  handler: function handler(request, reply) {
    var getOperation = Knex('birdbase').where({

      isPublic: true

    }).select('name', 'species', 'picture_url').then(function (results) {
      if (!results || results.length === 0) {
        reply({
          error: true,
          errMessage: 'no public bird found'
        });
      }

      reply({

        dataCount: results.length,
        data: results

      });
    }).catch(function (err) {
      reply('server-side error');
    });
  }
});
