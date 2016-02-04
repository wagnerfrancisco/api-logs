'use strict';

const assert = require('assert');
const sinon = require('sinon');
const errors = require('elasticsearch').errors;
const errorHandler = require('src/commons/error-handler');

describe('errorHandler', function() {
    let res;

    beforeEach(function() {
        res = {
            sendStatus: sinon.spy()
        };
    });

    it('should return HTTP 404 if NotFound err', function() {
        const err = new errors.NotFound();
        errorHandler(err, null, res);
        assert(res.sendStatus.calledWith(404), '404 if NotFound');
    });

    it('should return HTTP 500 for other errors', function() {
        const err = new Error();
        errorHandler(err, null, res);
        assert(res.sendStatus.calledWith(500), '500 for other errors');
    });

    it('should send 401 if UnauthorizedError', function() {
        const err = new Error();
        err.name = 'UnauthorizedError';
        errorHandler(err, null, res);
        assert(res.sendStatus.calledWith(401), '401 for Unauthorized');
    });
});
