'use strict';

const request = require('supertest');
const es = require('elasticsearch');
const _ = require('lodash');
const data = require('./data');
const esMapping = require('./es-mapping');
const app = require('src/main');

describe('/api', function() {
    const expectations = data.expectations;

    const fooToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IldhZ25lciIsImFkbWluIjp0cnVlLCJ0ZW5hbnQiOiJmb28ifQ.bW3-0oHmg6skos-URcftzehy1sfwybtujBEH_3oQnOU';
    const barToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IldhZ25lciIsImFkbWluIjp0cnVlLCJ0ZW5hbnQiOiJiYXIifQ.dZdX4A2ZKmHlouAX53MFEL9rXvYqF3V4xcm5bvTRUJY';

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
                    .set('Authorization', fooToken)
                    .expect('Content-Type', /json/)
                    .expect(200, expectation, done);
            });
        });

        it('should respect tenant', function(done) {
            request(app)
                .get(`/api/logs/0`)
                .set('Authorization', barToken)
                .expect('Content-Type', /json/)
                .expect(200, {}, done);
        });
    });

    it('GET /api/users/:user_id/logs', function(done) {
        const userId = 'auth0|1';

        const expected = expectations.filter(function(log) {
            return log.user_id === userId;
        });

        request(app)
            .get(`/api/users/${userId}/logs`)
            .set('Authorization', fooToken)
            .expect('Content-Type', /json/)
            .expect(200, expected, done);
    });

    describe('GET /api/logs', function() {
        it('by ip', function(done) {
            const ip = '1.1.1.3';
            const url = `/api/logs?ip=${ip}`;

            const expected = expectations.filter(function(log) {
                return log.ip === ip;
            });

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('by connection', function(done) {
            const connection = 'Username-Password-Authentication';
            const url = `/api/logs?connection=${connection}`;

            const expected = expectations.filter(function(log) {
                return log.connection === connection;
            });

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('by user_name', function(done) {
            const userName = 'user1@email.com';
            const url = `/api/logs?user_name=${userName}`;

            const expected = expectations.filter(function(log) {
                return log.user_name === userName;
            });

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('by client', function(done) {
            const clientName = 'app1';
            const url = `/api/logs?client_name=${clientName}`;

            const expected = expectations.filter(function(log) {
                return log.client_name === clientName;
            });

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('by date', function(done) {
            const from = '2015-10-30T21:41:10.163Z';
            const to = '2015-11-30T21:41:10.163Z';
            const url = `/api/logs?date_from=${from}&date_to=${to}`;

            const expected = expectations.slice(1, 3);

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('by all fields', function(done) {
            const term = 'sername-Password-Authentication';
            const connection = 'Username-Password-Authentication';
            const url = `/api/logs?all=${term}`;

            const expected = expectations.filter(function(log) {
                return log.connection === connection;
            });

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('no filter', function(done) {
            const url = '/api/logs';

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expectations, done);
        });

        it('sort by user_name', function(done) {
            const url = '/api/logs?sort=user_name,connection';
            const expected = _.sortBy(expectations, ['user_name', 'connection']);

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('limits result per page / page 0', function(done) {
            const url = `/api/logs?per_page=2`;
            const expected = expectations.slice(0, 2);

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });

        it('limits result per page / page 1', function(done) {
            const url = `/api/logs?per_page=2&page=1`;
            const expected = expectations.slice(2, 4);

            request(app)
                .get(url)
                .set('Authorization', fooToken)
                .expect('Content-Type', /json/)
                .expect(200, expected, done);
        });
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
