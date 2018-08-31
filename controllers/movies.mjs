#!/usr/bin/env node
"use strict";

import knex from "../config/db";


const movies = {
    list: (req, res, next) => {

        knex("movie").select("*").then((result) => {
            res.send(result);
        })

    },

    query: (req, res, next) => {
        const query = req.query["q"].replace(/([A-Z])/g, ' $1').trim()
        console.log(query)
        /*
            the code above tranforms UmTiraNoJardim to Um Tira No Jardim
        for example and since SQL is case/punctuation insentitive the query
        will work anyway. Maybe a fuzzy filter would be better but I guess it is not
        the goal
        */
        knex("movie").where({ title: query }).then(result => {
            res.send(result);
        })
    }
}

export default movies;