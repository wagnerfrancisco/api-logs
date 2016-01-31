'use strict';

const request = require('supertest'),
      es = require('elasticsearch'),
      fs = require('fs'),
      _ = require('lodash'),
      app = require('src/main');

describe('/api/logs', function() {
    let content;

    before(function(done) {
        const client = new es.Client({
            host: 'localhost:9200'
        });

        content = JSON.parse(fs.readFileSync('./test/logs/data.json'));

        client.bulk({
            body: bulkIndex(content)
        }).then(function() {
            done();
        });
    });

    it('GET {_id}', function(done) {
        request(app)
            .get('/api/logs/1')
            .expect('Content-Type', /json/)
            .expect(200, content[0], done);
    });

    /*
     * Transforms an array of documents
     * into an array of index instructions
     * for bulk API
     */
    function bulkIndex(content) {
        const prepare = function(entry) {
            const obj = _.omit(entry, '_id');
            const action = {
                 index: {
                     _index: 'api',
                     _type: 'logs',
                     _id: entry._id
                 }
             };

             return [action, obj];
        };

        return _.flatten(content.map(prepare));
    }
});
