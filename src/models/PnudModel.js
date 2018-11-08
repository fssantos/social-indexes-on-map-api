#!/usr/bin/env node
"use strict";

const knex = require('../../config/db');

const RESOURCE = 'pnud'

class PnudModel {
    static async get(id) {

        return knex(RESOURCE).where({ id }).first();
    }
}


module.exports = PnudModel;