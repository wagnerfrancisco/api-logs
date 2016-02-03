'use strict';

const express = require('express');
const router = express.Router();
const appContext = require('../app-context');
const logsCtrl = appContext.logsCtrl;
const buildCriteria = require('../logs/build-criteria');

router.get('/:userId/logs', buildCriteria, logsCtrl.byUser);

module.exports = router;
