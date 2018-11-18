
const csv = require('csvjson');
const fs = require('fs');

const file = fs.readFileSync('./database/POA_PNUD_EN.csv', 'utf8');
var options = {
    delimiter: ',', // optional
    quote: true // optional
};

const dataObj = csv.toObject(file, options);


exports.seed = (knex, Promise) => {
    return knex.batchInsert('pnud', dataObj, 100)
        .returning('id')
        .then(() => {
        })
        .catch((e) => {
        });
};
