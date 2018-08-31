var faker = require('faker');

let createRecord = (knex, id) => {
  return knex('movie').insert({
    id,
    title: faker.lorem.words(),
    director: faker.name.title(),
    quantity: Math.floor(Math.random() * 15) + 1,
    created_at: new Date(),
    updated_at: new Date()
  })
}

exports.seed = (knex, Promise) => {
  return knex('movie').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 10; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};