'use strict';

const express = require('express'),
      router = express.Router();

router.get('/:id', function(req, res) {
    res.json({
      "date": "2016-01-30T21:41:10.163Z",
      "type": "ss",
      "description": "",
      "connection": "Username-Password-Authentication",
      "client_id": "YeWtPr2uLVG1KRXO92XJMIg0OgdvPza3",
      "client_name": "All Applications",
      "ip": "127.0.0.1",
      "user_agent": "unknown",
      "details": {
          "foo": "bar"
      },
      "user_id": "auth0|1",
      "user_name": "user@email.com",
      "strategy": "auth0",
      "strategy_type": "database",
      "_id": "1"
    });
});

module.exports = router;
