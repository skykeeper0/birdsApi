module.exports = require('knex')({
  client: 'mysql',
  connection: {
    host: 'freebird.c7vnc5yar7af.us-west-1.rds.amazonaws.com',
    user: 'admin',
    password: '*********',

    database: 'birdbase',
    charset: 'utf8',
  },
});
