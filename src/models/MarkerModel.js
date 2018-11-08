#!/usr/bin/env node
"use strict";

const knex = require('../../config/db');

const RESOURCE = 'marker'

class MarkerModel {
    static async get(id) {

        return knex(RESOURCE).where({ id }).first();
    }

    static async list(id) {

        return knex(RESOURCE).select('*');
    }
}


module.exports = MarkerModel;