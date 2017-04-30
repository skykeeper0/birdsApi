// up functon is executed when you migrate a database for this
exports.up = function (knex, Promise) {
  return knex
    .schema
    .createTable('users', (usersTable) => {
      // Primary Key
      usersTable.increments();

      // Data
      usersTable.string('name', 50).notNullable();
      usersTable.string('username', 50).notNullable().unique();
      usersTable.string('email', 250).notNullable().unique();
      usersTable.string('password', 128).notNullable().unique();
      usersTable.string('guid', 50).notNullable().unique();

      usersTable.timestamp('created_at').notNullable();
    })

    .createTable('birds', (birdsTable) => {
      // Primary Key
      birdsTable.increments();
      // .referencers(...) is used to create a composite primary key.
      birdsTable.string('owner', 36).references('guid').inTable('users');

      // Data
      // Each chainable method creates a column of the given type with the chained constraints. For example, in the line below, we create a column named `name` which has a maximum length of 250 characters, is of type string (VARCHAR) and is not nullable.
      birdsTable.string('name', 250).notNullable();
      birdsTable.string('species', 250).notNullable();
      birdsTable.string('picture_url', 250).notNullable();
      birdsTable.string('guid', 36).notNullable().unique();
      birdsTable.boolean('isPublic').notNullable().defaultTo(true);

      birdsTable.timestamp('created_at').notNullable();
    });
};


// down function is executed when you rollback
exports.down = function (knex, Promise) {
  return knex
    .schema
      .dropTableifExists('birds')
      .dropTableifExists('users');
};