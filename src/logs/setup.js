'use strict';

const express = require('express');
const router = express.Router();
const appContext = require('../app-context');
const logsCtrl = appContext.logsCtrl;

router.get('/:id', logsCtrl.byId);

module.exports = router;
