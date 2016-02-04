'use strict';

const assert = require('assert');
const secretCallback = require('src/commons/secret-callback');

describe('secretCallback', function() {
    let req;

    beforeEach(function() {
        req = {};
    });

    it('should set tenant', function() {
        secretCallback(req, {
            tenant: 'foo'
        }, function() {
            assert.equal('foo', req.tenant);
        });
    });

    it('should throw if no secret', function() {
        secretCallback(req, {
            tenant: 'unknown'
        }, function(e) {
            assert.ok(e instanceof Error);
        });
    });
});
