'use strict';

const express = require('express');
const router = express.Router();
const appContext = require('../app-context');
const logsCtrl = appContext.logsCtrl;
const buildCriteria = require('./build-criteria');

router.get('/:id', buildCriteria, logsCtrl.byId);
router.get('/', buildCriteria, logsCtrl.byCriteria);

module.exports = router;
