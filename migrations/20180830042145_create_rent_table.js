
exports.up = function (knex, Promise) {
    return knex.schema.createTable('rent', function (t) {
        t.increments('id').primary()
        t.integer('user_id').references('id').inTable('user').notNullable().unsigned();
        t.integer('movie_id').references('id').inTable('movie').notNullable().unsigned();
        t.string('status').notNullable()
        t.dateTime('returned_on').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('rent')
};
