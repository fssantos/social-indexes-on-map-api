#!/usr/bin/env node
"use strict";
const PnudModel = require('../models/PnudModel');


class PnudController {
    static async get(req, res, next) {
        const { id } = req.params;

        try {

            const pnud = await PnudModel.get(id);

            res.send({ message: 'success', data: pnud })
        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }

    static async search(req, res, next) {
        const field = req.query.type;

        try {

            const pnud = await PnudModel.listBy(field);

            res.send(pnud)
        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }
}


module.exports = PnudController;