#!/usr/bin/env node
"use strict";

import knex from "../config/db";


const messages = {
    ALREADY_DID_OPERATION: "Already did operation",
    RENTED_SUCESSFULLY: "The movie is yours!",
    RETURNED_SUCESSFULLY: "The movie is back!"

}
const rentStatus = {
    RENTED: "rented",
    RETURNED: "returned",
    WAITING: "waiting"
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
        const status = rentStatus.WAITING;
        knex('rent').insert({
            movie_id,
            user_id,
            status,
        }).then(result => {
            decrementMovieQuantity(result[0], status, res)
        });
    },

    update(req, res, next) {
        const id = req.params.id || "";
        const { status } = req.body;

        if (status === rentStatus.RENTED || status === rentStatus.WAITING) {
            decrementMovieQuantity(id, status, res);
        }
        else if (status === rentStatus.RETURNED) {
            incrementMovieQuantity(id, status, res)
        }
    },
}

function decrementMovieQuantity(id, status, res) {
    knex('rent').select("*").where({ id: id }).then((rent) => {
        if (rent[0].status === rentStatus.WAITING || rent[0].status !== status) {
            knex.transaction(trx => {
                knex("movie").select("*").where({ id: rent[0].movie_id }).andWhere('quantity', '>', 0).forUpdate().
                    decrement("quantity", 1).then(() => {
                        knex("rent").select("*").where({ id: id }).update({
                            status: rentStatus.RENTED,
                            returned_on: Date.now(),
                        }).then(() => { res.status(200).json(messages.RENTED_SUCESSFULLY); trx.commit; })
                            .catch(() => trx.rollback);
                    }).catch(() => trx.rollback);
            }).catch(err => console.log(err))
        } else { res.status(409).json(messages.ALREADY_DID_OPERATION) }
    })
}

function incrementMovieQuantity(id, status, res) {
    knex('rent').select("*").where({ id: id }).then((rent) => {
        if (rent[0].status !== status) {
            knex.transaction(trx => {
                knex("movie").where({ id: rent[0].movie_id }).forUpdate().
                    increment("quantity", 1).then(() => {
                        knex("rent").select("*").where({ id: id }).update({
                            status: status,
                            returned_on: Date.now(),
                        }).then(() => { res.status(200).json(messages.RETURNED_SUCESSFULLY); trx.commit; })
                            .catch(() => trx.rollback);
                    }).catch((err) => { console.log(err); trx.rollback });
            }).catch(err => console.log(err))
        } else { res.status(409).json(messages.ALREADY_DID_OPERATION) }
    })
}

export default rents;