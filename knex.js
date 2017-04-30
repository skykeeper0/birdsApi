export default require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'skykeeper0',
    password: '123',

    database: 'birdbase',
    charset: 'utf8',
  },
});
