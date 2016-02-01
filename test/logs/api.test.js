'use strict';

const request = require('supertest');
const es = require('elasticsearch');
const _ = require('lodash');
const data = require('./data');
const app = require('src/main');

describe('/api', function() {
    const expectations = data.expectations;

    before(function(done) {
        const client = new es.Client({
            host: 'localhost:9200'
        });

        client.bulk({
            body: bulkIndex(data.elasticSearch)
        }).then(function() {
            done();
        });
    });

    describe('GET /api/logs/:id', function() {
        expectations.forEach(function(expectation, index) {
            it(`id: ${index}`, function(done) {
                request(app)
                    .get(`/api/logs/${index}`)
                    .expect('Content-Type', /json/)
                    .expect(200, expectation, done);
            });
        });
    });

    it('GET /api/users/:user_id/logs', function(done) {
        const userId = 'auth0|1';

        const expected = expectations.filter(function(log) {
            return log.user_id === userId;
        });

        request(app)
            .get('/api/users/auth0|1/logs')
//            .expect('Content-Type', /json/)
            .expect(200, expected, done);
    });

    /*
     * Transforms an array of documents
     * into an array of index instructions
     * for bulk API
     */
    function bulkIndex(content) {
        const prepare = function(entry, index) {
            const obj = _.omit(entry, '_id');
            const action = {
                 index: {
                     _index: 'api',
                     _type: 'logs',
                     _id: index
                 }
             };

             return [action, obj];
        };

        return _.flatten(content.map(prepare));
    }
});
