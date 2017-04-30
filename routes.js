const Knex = require('./knex');
const jwt = require('jsonwebtoken');
const GUID = require('node-uuid');

const routes = [
  {
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
  }, {
    path: '/birds',
    method: 'POST',
    config: {
      auth: {
        strategy: 'token',
      },
    },
    handler: (request, reply) => {
      console.log(request.auth.credentials);

      const { bird } = request.payload;
      const guid = GUID.v4();

      const insertOperation = Knex('birds').insert({
        owner: request.auth.credentials.scope,
        name: bird.name,
        species: bird.species,
        picture_url: bird.picture_url,
        guid,

      }).then((res) => {
        reply({
          data: guid,
          message: 'successfully created bird',
        });
      }).catch((err) => {
        reply('server-side error');
      });
    },
  },
];

// -----------
// Routes
// -----------

// Test route
// server.route({
//   method: 'GET',
//   path: '/hello',
//   handler(request, reply) {
//     return reply('hello world');
//   },
// });

// // GET /birds - get all birds in database
// server.route({
//   path: '/birds',
//   method: 'GET',
//   handler: (request, reply) => {
//     const getOperation = Knex('birds').where({

//       isPublic: true,

//     }).select('name', 'species', 'picture_url').then((results) => {
//       if (!results || results.length === 0) {
//         reply({
//           error: true,
//           errMessage: 'no public bird found',
//         });
//       }

//       reply({

//         dataCount: results.length,
//         data: results,

//       });
//     }).catch((err) => {
//       reply('server-side error');
//     });
//   },
// });

// // POST /auth - authentication route, return web token
// server.route({

//   path: '/auth',
//   method: 'POST',
//   handler: (request, reply) => {
//         // This is a ES6 standard
//     const { username, password } = request.payload;

//     const getOperation = Knex('users').where({

//       // Equiv. to `username: username`
//       username,

//     }).select('password', 'guid').then(([user]) => {
//         // if user are not found
//       if (!user) {
//         reply({

//             error: true,
//             errMessage: 'the specified user was not found',

//           });

//           // return to not suing else condition
//         return;
//       }

//         // if user are found
//       if (user.password === password) {
//         const token = jwt.sign({
//             username,
//             scope: user.guid,
//           }, 'vZiYpmTzqXMp8PpYXKwqc9ShQ1UhyAfy', {
//             algorithm: 'HS256',
//             expiresIn: '1h',
//           });

//         reply({
//           token,
//           scope: user.guid,
//         });
//       } else {
//         reply('incorrect password');
//       }
//     }).catch((err) => {
//       reply('server-side error: ', err);
//     });
//   },

// });

// //POST /birds to add bird to database
// server.route({
//   path: '/birds',
//   method: 'POST',
//   config: {
//     auth: {
//       strategy: 'token',
//     }
//   }
//   handler: (request, reply) => {
//     const { bird } = request.payload;
//   }
// })

exports.routes = routes;
