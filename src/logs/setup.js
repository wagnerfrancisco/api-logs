'use strict';

const express = require('express'),
      logsCtrl = require('./logs-ctrl')(),
      router = express.Router();

router.get('/:id', logsCtrl.getId);

module.exports = router;
