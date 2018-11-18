#!/usr/bin/env node
"use strict";

const knex = require('../../config/db');

const RESOURCE = 'pnud'

class PnudModel {
    static async get(id) {
        return knex(RESOURCE).where({ id }).first();
    }

    static async list() {
        return knex(RESOURCE).select('*');
    }

    static async listBy(field) {
        return knex(RESOURCE).select('id', field);
    }
}


module.exports = PnudModel;