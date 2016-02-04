'use strict';

const assert = require('assert');
const build = require('src/logs/criteria').build;

describe('criteria', function() {
    it('should add tenant', function() {
        const criteria = build();
        criteria.addTenant('xyz');
        assert.deepEqual({
            query: {
                bool: {
                    filter: [
                        {
                            term: {
                                tenant: 'xyz'
                            }
                        }
                    ]
                }
            }
        }, criteria.toEsQuery());
    });

    it('should add id', function() {
        const criteria = build();
        criteria.addId('1');
        assert.deepEqual({
            query: {
                bool: {
                    filter: [
                        {
                            ids: {
                                type: 'logs',
                                values: ['1']
                            }
                        }
                    ]
                }
            }
        }, criteria.toEsQuery());
    });

    it('should add user', function() {
        const criteria = build();
        criteria.addUser('user01');
        assert.deepEqual({
            query: {
                bool: {
                    filter: [
                        {
                            term: {
                                user_id: 'user01'
                            }
                        }
                    ]
                }
            }
        }, criteria.toEsQuery());
    });

    it('should add url query params', function() {
        const query = {
            ip: '127.0.0.1',
            client_name: 'erp',
            connection: 'slow',
            user_name: 'homer',
            date_from: '2016-02-01T23:40:00',
            date_to: '2016-03-01T23:40:00',
            all: 'anything',
            sort: 'user_name,connection',
            page: 1,
            per_page: 10
        };
        const criteria = build();

        criteria.addUrlQuery(query);

        assert.deepEqual({
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: 'anything',
                                fuzziness: 'auto',
                                fields: [
                                    'client_name',
                                    'connection',
                                    'user_name']
                            }
                        }
                    ],
                    filter: [
                        {
                            term: {
                                ip: '127.0.0.1'
                            }
                        },
                        {
                            term: {
                                client_name: 'erp'
                            }
                        },
                        {
                            term: {
                                connection: 'slow'
                            }
                        },
                        {
                            term: {
                                user_name: 'homer'
                            }
                        },
                        {
                            range: {
                                date: {
                                    lte: '2016-03-01T23:40:00',
                                    gte: '2016-02-01T23:40:00'
                                }
                            }
                        }
                    ]
                }
            },
            sort: [
                {
                    user_name: {
                        order: 'asc'
                    }
                },
                {
                    connection: {
                        order: 'asc'
                    }
                }
            ],
            size: 10,
            from: 10
        }, criteria.toEsQuery());
    });

    it('should sort by date if no fuzzy and no sort', function() {
        const query = {};
        const criteria = build();

        criteria.addUrlQuery(query);

        assert.deepEqual({
            query: {
                bool: {
                    filter: []
                }
            },
            sort: [{
                    date: {
                        order: 'asc'
                    }
                }]
        }, criteria.toEsQuery());
    });
});
