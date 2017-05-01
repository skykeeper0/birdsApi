exports.seed = function seed(knex, Promise) {
  const tableName = 'users';

  const rows = [
    {
      name: 'Shreyansh Pandey',
      username: 'labsvisual',
      password: 'password',
      email: 'me@isomr.co',
      guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c',
    },

  ];

  return knex(tableName)
    .del()
    .then(() => {
      return knex.insert(rows).into(tableName);
    });
};
