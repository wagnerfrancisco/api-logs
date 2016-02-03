'use strict';

const express = require('express');
const app = express();
const jwt = require('express-jwt');

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

app.use(jwt({
    secret: secretCallback
}));

app.use('/api/logs', require('./logs/setup'));
app.use('/api/users', require('./users/setup'));

app.use(require('./commons/error-handler'));

module.exports = app;

if (require.main === module) {
    app.listen(5000);
}
