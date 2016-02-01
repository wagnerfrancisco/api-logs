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

    const byUser = function(userId) {
        return client.search(options({
            body: {
                query: {
                    bool: {
                        filter: [{
                            term: {
                                user_id: userId
                            }
                        }]
                    }
                }
            }
        })).then(function(result) {
            return result.hits.hits.map(prepareResult);
        });
    };

    return Object.freeze({
        byId,
        byUser
    });
};

module.exports = logs;
