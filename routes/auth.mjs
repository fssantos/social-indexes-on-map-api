#!/usr/bin/env node
"use strict";

import express from "express";
import controller from "../controllers/auth.mjs";
import passport from "passport"

const router = express.Router();

router.get("/secret", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json("Success! You can not see this without a token");
});

router.post("/", controller.signup);
router.put("/", controller.login);
router.get("/", controller.logout);



export default router;

