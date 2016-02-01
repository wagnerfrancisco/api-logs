'use strict';

const errors = require('elasticsearch').errors;

const errorHandler = function(err, req, res, next) {
    if (err instanceof errors.NotFound) {
        res.sendStatus(404);
    } else {
        console.log('[ERROR]', err);
        res.sendStatus(500);
    }
};

module.exports = errorHandler;
