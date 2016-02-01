'use strict';

const logsCtrl = function(spec) {
    const logs = spec.logs;

    const byId = function(req, res, next) {
        const id = req.params.id;

        logs.byId(id)
            .then(function(result) {
                res.json(result);
            })
            .catch(next);
    };

    const byUser = function(req, res, next) {
        const userId = req.params.userId;

        logs.byUser(userId)
            .then(function(result) {
                res.json(result);
            })
            .catch(next);
    };

    return Object.freeze({
        byId,
        byUser
    });
};

module.exports = logsCtrl;
