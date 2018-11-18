const knex = require('../../config/db');

const RESOURCE = 'marker';


const buildColumnsQuery = (arr) => {
    const _arr = arr.map(e => {
        return `pnud.${e}`
    })

    return _arr.join(',');
}




class MarkerModel {
    static async get(id) {

        return knex(RESOURCE).where({ id }).first();
    }

    static async list(id) {

        return knex(RESOURCE).select('*');
    }

    static async listJoiningPnudInfos(type, queryColumnsArray) {
        const buildedQuery = buildColumnsQuery(queryColumnsArray);
        return knex(RESOURCE).select(knex.raw(`marker.type, ${buildedQuery}`))
            .whereNot({ type: 'MIX' })
            .andWhereNot({ type: 'UNDEFINED' })
            .innerJoin('pnud', 'marker.pnudId', 'pnud.id');
    }
}


module.exports = MarkerModel;

