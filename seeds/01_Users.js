
exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(() => 
      // Inserts seed entries
       knex('table_name').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' },
      ]));
};

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
