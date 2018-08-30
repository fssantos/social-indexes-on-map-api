#!/usr/bin/env node
"use strict";

import knex from "../config/db";


const rentStatus = {
    RENTED: "rented"
}



const rents = {
    list: (req, res, next) => {
        knex("rent").select("*").then((result) => {
            res.send(result);
        })

    },

    create(req, res, next) {
        /*
            in the case we would like to use header information
        to find who is the user
        const token = req.headers.authorization;
        const user_id = findUserByToken(token); */

        /*For now we just say user_id=1 is renting*/
        const { movie_id } = req.body;
        const user_id = "1";
        const status = rentStatus.RENTED;
        knex('rent').insert({
            movie_id,
            user_id,
            status,
        }).then(result => { res.status(200).json({ message: "rent ok!" }); });
    },

    update(req, res, next) {
        const id = req.params.id || "";
        const { status } = req.body;
        const returned_on = Date.now();

        knex('rent').where({ id: id }).update({
            status,
            returned_on
        }).then(result => { res.status(200).json({ message: "returned ok!" }); });

    },


}

export default rents;