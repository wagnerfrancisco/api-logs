'use strict';

const express = require('express'),
      app = express();

app.use('/api/logs', require('./logs/setup'));

module.exports = app;

if (require.main === module) {
    app.listen(5000);
}
