#!/usr/bin/env node
"use strict";


const movies = {
    list: (req, res, next) => {
        res.send({ hello: "3nd world" });
    }
}

export default movies;