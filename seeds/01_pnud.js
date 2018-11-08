
const csv = require('csvjson');
const fs = require('fs');

const file = fs.readFileSync('./database/POA_PNUD_EN.csv', 'utf8');
const dataObj = csv.toObject(file);


exports.seed = (knex, Promise) => {
    return knex.batchInsert('pnud', dataObj, 100)
        .returning('id')
        .then(() => {
        })
        .catch((e) => {
        });
};
