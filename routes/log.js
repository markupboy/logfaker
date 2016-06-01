var express = require('express');
var router = express.Router();
var cors = require('cors');

/* GET users listing. */
router.get('/', cors(), function(req, res, next) {
  var store = global.log;
  var log = store.log || "";
  var status = store.status || 'unavailable';
  var tail = req.query['tail'] && parseInt(req.query['tail'], 10);

  if(tail) {
    var limit = tail;
    var offset = log.length - limit;
    var part = log.slice(-1 * limit);
  } else {
    var offset = parseInt(req.query['offset'], 10) || 0;
    var limit = parseInt(req.query['limit'], 10) || 262144;
    var part = log.slice(offset, offset + limit);
  }

  var size = part.length;

  switch(status) {
    case "unavailable":
      res.sendStatus(404);
      break;

    case "finished":
      res.set('X-Logstream-End', 1);

    case "streaming":
      res.status(200).json({
        offset: offset + size,
        limit: limit,
        size: size,
        data: part
      });

      break;

    case "failed":
      res.sendStatus(500);
      break;
  }
});

module.exports = router;
