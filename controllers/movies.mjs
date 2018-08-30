#!/usr/bin/env node
"use strict";

import db from "../knexfile";


const movies = {
    list: (req, res, next) => {
        res.send({ hello: "3nd world" });
    },

    query: (req, res, next) => {

        db.query("SELECT * FROM posts", (err, result) => {

            const query = req.query;
            res.send(result);
            res.send({ query: req.query["q"].toLowerCase() });
        });


    }
}

export default movies;