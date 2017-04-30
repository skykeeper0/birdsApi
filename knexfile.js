module.exports = {
  development: {
    // migration: { tableName: 'knex_migrations' },
    // seeds: { tableName: './seeds' },

    client: 'mysql',
    connection: {

      host: 'localhost',
      user: 'skykeeper0',
      password: '123',

      database: 'birdbase',
      charset: 'utf8',
    },

  },
};
