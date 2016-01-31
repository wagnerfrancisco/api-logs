'use strict';

const logsCtrl = function(spec) {
    const esClient = spec.esClient;

    const getId = function(req, res, next) {
        const id = req.params.id;

        esClient.get({
            index: 'api',
            type: 'logs',
            id: id
        }).then(function(result) {
            const content = result._source;
            content._id = result._id;
            res.json(result._source);
        });
    };

    return Object.freeze({
        getId
    });
};

module.exports = logsCtrl;
