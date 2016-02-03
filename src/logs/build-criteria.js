'use strict';

const logCriteria = require('./log-criteria');

const buildCriteria = function(req, res, next) {
    req.criteria = logCriteria(req);
    next();
};

module.exports = buildCriteria;
