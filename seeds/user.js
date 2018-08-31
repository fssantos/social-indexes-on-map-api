var faker = require('faker');

let createRecord = (knex, id) => {
  return knex('user').insert({
    id,
    name: faker.internet.userName(),
    email: faker.internet.exampleEmail().toLowerCase(),
    password: faker.internet.password(),
    created_at: new Date(),
    updated_at: new Date()
  })
}

exports.seed = (knex, Promise) => {
  return knex('user').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 10; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};