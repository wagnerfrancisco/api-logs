'use strict';

const _ = require('lodash');

const logs = function(spec) {
    const client = spec.esClient;

    const options = function(newOptions) {
        return _.extend({
            index: 'api',
            type: 'logs'
        }, newOptions);
    };

    const prepareResult = function(result) {
        const obj = result._source;

        obj._id = result._id;
        delete obj.tenant;

        return obj;
    };

    const byId = function(id) {
        return client.get(options({
            id: id
        })).then(prepareResult);
    };

    return Object.freeze({
        byId
    });
};

module.exports = logs;
