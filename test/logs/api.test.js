'use strict';

const request = require('supertest'),
      fs = require('fs'),
      app = require('src/main');

describe('/api/logs', function() {
    let content;

    beforeEach(function() {
        content = fs.readFileSync('./test/logs/data.json');
    });

    it('GET {_id}', function(done) {
        request(app)
            .get('/api/logs/1')
            .expect('Content-Type', /json/)
            .expect(200, JSON.parse(content), done);
    });
});
