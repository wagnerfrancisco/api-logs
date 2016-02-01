'use strict';

const express = require('express');
const router = express.Router();

const logsCtrl = (function() {
    const es = require('elasticsearch');

    const esClient = es.Client({
        host: 'localhost:9200'
    });

    const logs = require('./logs')({
        esClient
    });

    return require('./logs-ctrl')({
        logs
    });
}());

router.get('/:id', logsCtrl.byId);

module.exports = router;
