'use strict';

const _ = require('lodash');

const strFields = [
    'client_name',
    'connection',
    'user_name'
];

const build = function() {

    const result = {
        query: {
            bool: {
                filter: [
                ]
            }
        }
    };

    const filters = result.query.bool.filter;

    const addId = function(id) {
        filters.push({
            ids: {
                type: 'logs',
                values: [id]
            }
        });
    };

    const addTenant = function(tenant) {
        filters.push({
            term: {
                tenant
            }
        });
    };

    const addUser = function(user) {
        filters.push({
            term: {
                user_id: user
            }
        });
    };

    const addUrlQuery = function(query) {
        if (query.ip) {
            filters.push({
                term: {
                    ip: query.ip
                }
            });
        }

        strFields.forEach(function(f) {
            if (query[f]) {
                filters.push({
                    term: {
                        [f]: query[f]
                    }
                });
            }
        });

        if (query.date_from || query.date_to) {
            let range = {
                date: {}
            };

            if (query.date_from) {
                range.date.gte = query.date_from;
            }

            if (query.date_to) {
                range.date.lte = query.date_to;
            }

            filters.push({
                range
            });
        }

        if (query.all) {
            result.query.bool.must = [{
                multi_match: {
                    query: query.all,
                    fuzziness: 'auto',
                    fields: strFields
                }
            }];
        }

        if (query.sort) {
            let sort = query.sort.split(',').map(function(s) {
                return {
                    [s]: {
                        order: 'asc'
                    }
                };
            });

            result.sort = sort;
        } else if (!query.all) {
            /*
             * Sort by date if no fuzzy match
             * or sort params
             */
            result.sort = [{
                date: {
                    order: 'asc'
                }
            }];
        }

        setupPagination(query);
    };

    const setupPagination = function(query) {
        let size = (query && query.per_page) || 10;
        let from = (query && query.page) || 0;

        result.size = size;
        result.from = size * from;
    };

    const size = function() {
        return result.size;
    };

    const toEsQuery = function() {
        return result;
    };

    return Object.freeze({
        addId,
        addTenant,
        addUrlQuery,
        addUser,
        size,
        toEsQuery
    });
};

const init = function(req, res, next) {
    const criteria = build();

    criteria.addTenant(req.tenant);
    req.criteria = criteria;

    next();
};

module.exports = {
    init: init,
    build: build
};
