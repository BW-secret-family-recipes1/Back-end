
exports.up = function(knex) {
  return knex.schema 
  .createTable('users', tbl => {
      tbl.increments();
      tbl.string('name');
      tbl.string('email')
        .unique();
      tbl.string('username', 50)  
        .notNullable()
        .unique();
      tbl.string('password', 50)
        .notNullable();
  })
  .createTable('recipes', tbl => {
      tbl.increments();
      tbl.string('title', 100)
        .notNullable()
        .index();
      tbl.string('creator')
        .index();
      tbl.string('ingredients', 1000)
        .notNullable();
      tbl.string('directions', 1000)
        .notNullable();
      tbl.string('category', 30)
        .notNullable()
        .index();
      // foreign key that references the id in the users table...this is a one to many 
      tbl.integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  })
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('recipes')
  .dropTableIfExists('users')
};
