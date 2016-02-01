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

    return Object.freeze({
        byId
    });
};

module.exports = logsCtrl;
