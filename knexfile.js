module.exports = {
  development: {
    migration: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },

    client: 'mysql',
    connection: {
      host: 'freebird.c7vnc5yar7af.us-west-1.rds.amazonaws.com',
      user: 'admin',
      password: 'demon895530',

      database: 'birdbase',
      charset: 'utf8',
    },
  },
};

