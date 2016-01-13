var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  var store = global.log;
  var log = store.log || "";
  var status = store.status || 'unavailable';
  var offset = parseInt(req.query['offset'], 10) || 0;
  var part = log.slice(offset);

  switch(status) {
    case "unavailable":
      res.sendStatus(404);
      break;

    case "finished":
      res.set('X-Logstream-End', 1);

    case "streaming":
      res.status(200).json({
        offset: offset + part.length,
        limit: 262144,
        size: part.length,
        data: part
      });
      break;

    case "failed":
      res.sendStatus(500);
      break;
  }
});

module.exports = router;
