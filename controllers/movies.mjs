#!/usr/bin/env node
"use strict";


const movies = {
    list: (req, res, next) => {
        res.send({ hello: "3nd world" });
    },

    query: (req, res, next) => {

        const query = req.query;
        res.send({ query: req.query["q"].toLowerCase() });
    }
}

export default movies;