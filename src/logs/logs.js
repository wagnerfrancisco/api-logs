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

    const byCriteria = function(criteria) {
        return client.search(options({
            body: criteria.toEsQuery()
        })).then(function(result) {
            return result.hits.hits.map(prepareResult);
        });
    };

    return Object.freeze({
        byCriteria
    });
};

module.exports = logs;
