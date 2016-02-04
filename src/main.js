'use strict';

const express = require('express');
const jwt = require('express-jwt');

const appContext = require('./app-context');
const logsCtrl = appContext.logsCtrl;
const app = express();
const buildCriteria = require('./logs/build-criteria');

const secretCallback = (function() {
    const secrets = {
        foo: 'barbecue',
        bar: 'bacon'
    };

    return function(req, payload, done) {
        const tenant = payload.tenant;
        const secret = secrets[tenant];

        if (!secret) {
            done(new Error('missing_secret'));
        } else {
            req.tenant = tenant;
            done(null, secret);
        }
    };
}());

const logsRouter = (function() {
    const router = express.Router();
    router.use(buildCriteria);
    router.get('/api/logs/:id', logsCtrl.byId);
    router.get('/api/logs', logsCtrl.byCriteria);
    router.get('/api/users/:userId/logs', logsCtrl.byUser);
    return router;
}());

app.use(jwt({
    secret: secretCallback
}));

app.use(logsRouter);
app.use(require('./commons/error-handler'));

if (require.main === module) {
    app.listen(5000);
}

module.exports = app;
