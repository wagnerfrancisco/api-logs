'use strict';

const secrets = {
    foo: 'barbecue',
    bar: 'bacon'
};

module.exports = function(req, payload, done) {
    const tenant = payload.tenant;
    const secret = secrets[tenant];

    if (!secret) {
        done(new Error('missing_secret'));
        return;
    }

    req.tenant = tenant;
    done(null, secret);
};
