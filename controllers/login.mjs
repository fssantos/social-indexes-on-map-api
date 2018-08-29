#!/usr/bin/env node
"use strict";

import jwt from "jsonwebtoken";

import _ from "lodash";


var users = [
    {
        id: 1,
        name: 'filipe',
        password: '12345'
    },
    {
        id: 2,
        name: 'test',
        password: 'test'
    }
];


const login = {
    update: (req, res, next) => {
        if (req.body.name && req.body.password) {
            var name = req.body.name;
            var password = req.body.password;
        }
        // usually this would be a database call:
        var user = users[_.findIndex(users, { name: name })];
        if (!user) {
            res.status(401).json({ message: "no such user found" });
        }

        if (user.password === req.body.password) {
            // from now on we'll identify the user by the id and the id is the only personalized value that goes into our token
            var payload = { id: user.id };
            var token = jwt.sign(payload, "tasmanianDevil");
            res.json({ message: "ok", token: token });
        } else {
            res.status(401).json({ message: "passwords did not match" });
        }
    },
}

export default login;