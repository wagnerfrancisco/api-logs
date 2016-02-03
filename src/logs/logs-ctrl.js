'use strict';

const logsCtrl = function(spec) {
    const logs = spec.logs;

    const byId = function(req, res, next) {
        const criteria = req.criteria;

        criteria.addId(req.params.id);

        logs.byCriteria(criteria)
            .then(function(result) {
                res.json(result[0] || {});
            })
            .catch(next);
    };

    const byUser = function(req, res, next) {
        const criteria = req.criteria;

        criteria.addUser(req.params.userId);

        logs.byCriteria(criteria)
            .then(function(result) {
                res.json(result);
            })
            .catch(next);
    };

    const byCriteria = function(req, res, next) {
        const criteria = req.criteria;

        criteria.addUrlQuery(req.query);

        logs.byCriteria(criteria)
            .then(function(result) {
                res.json(result);
            })
            .catch(next);
    };

    return Object.freeze({
        byId,
        byUser,
        byCriteria
    });
};

module.exports = logsCtrl;
