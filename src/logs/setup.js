'use strict';

const express = require('express'),
      router = express.Router(),

      logsCtrl = (function() {
          const es = require('elasticsearch');

          const client = es.Client({
              host: 'localhost:9200'
          });

          return require('./logs-ctrl')({
              esClient: client
          });
      }());

router.get('/:id', logsCtrl.getId);

module.exports = router;
