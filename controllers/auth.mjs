#!/usr/bin/env node
"use strict";


const messages = {
    SIGN_UP_SUCESSFULL: "User was created sucessfully",
    SIGN_UP_USER_ALREADY_EXISTS: "Email already exists on database",
    USER_NOT_FOUND: "User not found",
    LOGIN_SUCESSFULL: "User logged in",
    WRONG_PASSWORD: "passwords did not match",
    LOGOUT_SUCESSFULL: "You are logged out. Please destroy your token"
}

import jwt from "jsonwebtoken";
import _ from "lodash";


import knex from "../config/db";

const emailExists = "SELECT * FROM users WHERE "

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


const auth = {
    login: (req, res, next) => {
        const { email, password } = req.body;
        console.log(email);
        // usually this would be a database call:
        knex("user").where({ email: email }).then(result => {
            if (result.length === 0) {
                res.status(401).json({ message: messages.USER_NOT_FOUND });
            }
            else {
                const user = result[0];
                if (user.password === password) {

                    var payload = { id: user.id };
                    var token = jwt.sign(payload, "tasmanianDevil");
                    res.json({ message: messages.LOGIN_SUCESSFULL, token: "JWT " + token });
                } else {
                    res.status(401).json({ messages: message.WRONG_PASSWORD });
                }

            }

        })
    },
    signup: (req, res, next) => {
        const { name, email, password } = req.body;

        knex("user").where({ email: email }).then((result) => {
            if (result.length === 0) {
                knex('user').insert({
                    name,
                    email,
                    password
                }).then(result => { res.status(200).json({ message: messages.SIGN_UP_SUCESSFULL }); });
            }
            else {
                res.status(401).json({ message: messages.SIGN_UP_USER_ALREADY_EXISTS });
            }
        });


    },
    logout: (req, res) => {
        res.status(200).json({ message: messages.LOGOUT_SUCESSFULL })

    },
}

export default auth;