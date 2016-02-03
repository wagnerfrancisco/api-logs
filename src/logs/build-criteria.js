'use strict';

const logCriteria = require('./log-criteria');

const buildCriteria = function(req, res, next) {
    const criteria = logCriteria();

    criteria.addTenant(req.tenant);
    req.criteria = criteria;

    next();
};

module.exports = buildCriteria;
