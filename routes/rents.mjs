#!/usr/bin/env node
"use strict";

import express from "express";
import controller from "../controllers/rents";

const router = express.Router();

router.get("/", controller.list);
router.post("/", controller.create);
router.put("/:id", controller.update);


export default router;

