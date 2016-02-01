'use strict';

const logsCtrl = (function() {
    const es = require('elasticsearch');

    const esClient = es.Client({
        host: 'localhost:9200'
    });

    const logs = require('./logs/logs')({
        esClient
    });

    return require('./logs/logs-ctrl')({
        logs
    });
}());

module.exports = {
    logsCtrl
};
