#!/usr/bin/env node
"use strict";

const express = require('express');

const PnudController = require('../controllers/PnudController');

const router = express.Router();

router.get("/search", PnudController.search);
router.get("/:id", PnudController.get);




module.exports = router;

