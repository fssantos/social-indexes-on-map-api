
exports.up = function (knex, Promise) {
    return knex.schema.createTable('movie', function (t) {
        t.increments('id').primary()
        t.string('title').notNullable()
        t.string('director').notNullable()
        t.integer('quantity').notNullable()
        t.timestamps(false, true)
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('movie')
};
