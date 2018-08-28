#!/usr/bin/env node
"use strict";

import express from "express";
import controller from "../controllers/movies";

const router = express.Router();

router.get("/", controller.list);


export default router;

