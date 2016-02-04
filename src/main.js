'use strict';

const express = require('express');
const jwt = require('express-jwt');

const appContext = require('./app-context');
const app = express();

const logsRouter = (function() {
    const router = express.Router();
    const logsCtrl = appContext.logsCtrl;

    router.use(require('./logs/criteria').init);
    router.get('/api/logs/:id', logsCtrl.byId);
    router.get('/api/logs', logsCtrl.byCriteria);
    router.get('/api/users/:userId/logs', logsCtrl.byUser);

    return router;
}());

app.use(jwt({
    secret: require('./commons/secret-callback')
}));

app.use(logsRouter);
app.use(require('./commons/error-handler'));

if (require.main === module) {
    app.listen(5000);
}

module.exports = app;
