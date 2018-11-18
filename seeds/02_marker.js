
const csv = require('csvjson');
const fs = require('fs');

const file = fs.readFileSync('./database/markers.csv', 'utf8');
const dataObj = csv.toObject(file);


exports.seed = (knex, Promise) => {
    return knex.batchInsert('marker', dataObj, 100)
        .returning('id')
        .then(() => {
        })
        .catch((e) => {
        });
};
