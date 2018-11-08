
exports.up = function (knex, Promise) {
    return knex.schema.createTable('marker', function (t) {
        t.increments('id').primary();
        t.string('socialName').nullable();
        t.string('address').nullable();
        t.string('postalCode').nullable();
        t.string('neighborhood').nullable();
        t.string('activity').nullable();
        t.string('pnudId').nullable();
        t.enum('type', ['ULTRA', 'MIX', 'NATURA', 'UNDEFINED']).defaultTo('UNDEFINED').nullable();
        t.string('lat').nullable();
        t.string('lng').nullable();

        t.timestamps(false, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('marker')
};
