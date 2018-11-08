#!/usr/bin/env node
"use strict";

const express = require('express');

const MarkerController = require('../controllers/MarkerController');

const router = express.Router();


router.get("/", MarkerController.list);
router.get("/:id", MarkerController.get);



module.exports = router;

