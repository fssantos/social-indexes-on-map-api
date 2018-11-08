#!/usr/bin/env node
"use strict";
const MarkerModel = require('../models/MarkerModel');


class MarkerController {
    static async get(req, res, next) {
        const { id } = req.params;

        try {

            const marker = await MarkerModel.get(id);

            res.send(marker);
        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }

    static async list(req, res, next) {
        try {

            const markers = await MarkerModel.list();

            res.send(markers)
        } catch (e) {
            res.send(401).json({ code: 'error' })

        }
    }
}


module.exports = MarkerController;