'use strict';

const request = require('supertest');
const es = require('elasticsearch');
const _ = require('lodash');
const data = require('./data');
const esMapping = require('./es-mapping');
const app = require('src/main');

describe('/api', function() {
    const expectations = data.expectations;

    before(function(done) {
        prepareES()
            .then(function() {
                done();
            })
            .catch(function(e) {
                console.log('ERR', e);
                done(e);
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
            .get(`/api/users/${userId}/logs`)
            .expect('Content-Type', /json/)
            .expect(200, expected, done);
    });

    function prepareES() {
        const index = 'api';

        const client = new es.Client({
            host: 'localhost:9200'
        });

        return client.indices.exists({
            index: index
        }).then(function(exists) {
            if (exists) {
                return client.indices.delete({
                    index: index
                });
            }
        }).then(function() {
            console.log('\tdeleted index', index);

            return client.indices.create({
                index: index
            });
        }).then(function() {
            console.log('\tcreated index', index);

            return client.indices.putMapping({
                index: index,
                type: 'logs',
                body: esMapping
            });
        }).then(function() {
            console.log('\tadded mapping', index);

            return client.bulk({
                body: bulkIndex(data.elasticSearch)
            });
        }).then(function() {
            console.log('\tcreated data', index);

            return client.indices.refresh({
                index: index
            });
        });
    }

    /*
     * Transforms an array of documents
     * into an array of index instructions
     * for bulk API
     */
    function bulkIndex(content) {
        const prepare = function(entry, index) {
            const obj = _.omit(entry, '_id');
            const action = {
                 create: {
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
