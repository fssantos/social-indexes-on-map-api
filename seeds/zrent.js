var faker = require('faker');




let createRecord = (knex, id) => {
  return knex('rent').insert({
    id,
    status: status[Math.floor(Math.random() * status.length)],
    user_id: (Math.floor(Math.random() * 8) + 1).toString(),
    movie_id: (Math.floor(Math.random() * 8) + 1).toString(),
    created_at: new Date(),
    updated_at: new Date()
  })
}

exports.seed = (knex, Promise) => {
  return knex('rent').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 10; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};


var status = [
  'returned',
  'rented'
];

