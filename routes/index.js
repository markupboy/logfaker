var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var store = global.log;
  res.render('index', { status: store.status, logText: store.log || "Log text will appear here" });
});

router.post('/', function(req, res, next) {
  var store = global.log;

  if(req.body.status) {
    store.status = req.body.status;
  }

  if(req.body.text) {
    if(store.log) {
      store.log += "\n" + req.body.text;
    } else {
      store.log = req.body.text;
    }
  }

  res.render('index', { status: store.status, logText: store.log || "Log text will appear here" });
});

module.exports = router;
