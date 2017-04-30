const Knex = require('./knex');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8080;
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
    const getOperation = Knex('birds').where({

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

// adding post bird route
server.route({

  path: '/auth',
  method: 'POST',
  handler: (request, reply) => {
        // This is a ES6 standard
    const { username, password } = request.payload;

    const getOperation = Knex('users').where({

      // Equiv. to `username: username`
      username,

    }).select('password', 'guid').then(([user]) => {
        // if user are not found
      if (!user) {
          reply({

            error: true,
            errMessage: 'the specified user was not found',

          });

          // return to not suing else condition
          return;
        }

        // if user are found
      if (user.password === password) {
          const token = jwt.sign({
            username,
            scope: user.guid,
          }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
            algorithm: 'HS256',
            expiresIn: '1h',
          });
          
          reply({
            token,
            scope: user.guid,
          });
        } else {
          reply('incorrect password');
        }
    }).catch((err) => {
      reply('server-side error: ', err);
    });
  },

});

