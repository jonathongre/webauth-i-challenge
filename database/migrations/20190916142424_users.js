
exports.up = function(knex) {
    return knex.schema.createTable('users', users => {
      users.increments();
      
      users.string('firstname', 128).notNullable();
      users.string('lastname', 128).notNullable();
      users
        .string('username', 128)
        .notNullable()
        .unique();
      users.string('password', 128).notNullable();
      users
        .string('email', 128)
        .notNullable()
        .unique();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };
