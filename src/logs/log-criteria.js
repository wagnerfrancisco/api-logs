'use strict';

const _ = require('lodash');

/*
 * Reads query params and transforms
 * them into an ES query
 */
const logCriteria = function(req) {
    const query = _.clone(req.query);

    const filterFields = {
        ip: 'ip',
        client_name: 'string',
        connection: 'string',
        user_name: 'string',
        date: 'date'
    };

    const multiMatchFields = [
        'client_name',
        'user_name',
        'connection'
    ];

    const filterFn = {
        ip: function(name, value) {
            return {
                term: {
                    [name]: value
                }
            };
        },

        string: function(name, value) {
            return {
                term: {
                    [name]: value
                }
            };
        },

        date: function(name, value) {
            const result = {
                range: {
                    [name]: {}
                }
            };

            if (value.from) {
                result.range[name].gte = value.from;
            }

            if (value.to) {
                result.range[name].lte = value.to;
            }

            return result;
        }
    };

    const toEsQuery = function() {
        const filters = Object.keys(filterFields)
            .filter(function(field) {
                return query[field];
            })
            .map(function(field) {
                const fn = filterFn[filterFields[field]];
                return fn(field, query[field]);
            });

        const must = [];

        if (query.all) {
            must.push({
                multi_match: {
                    query: query.all,
                    fuzziness: 'auto',
                    fields: multiMatchFields
                }
            });
        }

        return {
            query: {
                bool: {
                    must: must,
                    filter: filters
                }
            }
        };
    };

    if (query.date_from || query.date_to) {
        query.date = {
            from: query.date_from,
            to: query.date_to
        };
        delete query.date_from;
        delete query.date_to;
    }

    return Object.freeze({
        toEsQuery
    });
};

module.exports = logCriteria;
