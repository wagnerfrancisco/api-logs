'use strict';

const assert = require('assert');
const logCriteria = require('src/logs/log-criteria');

describe('log-criteria', function() {
    it('should return as es query', function() {
        const req = {
            query: {
                ip: '127.0.0.1',
                client_name: 'erp',
                connection: 'slow',
                user_name: 'homer',
                date_from: '2016-02-01T23:40:00',
                date_to: '2016-03-01T23:40:00',
                all: 'anything'
            }
        };
        const criteria = logCriteria(req);
        const query = criteria.toEsQuery();

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
                                    'user_name',
                                    'connection']
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
            }
        }, query);
    });
});
