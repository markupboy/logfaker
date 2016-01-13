var express = require('express');
var router = express.Router();
var fs = require('fs')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    status: global.log.status,
    logText: global.log.log
  });
});

router.post('/', function(req, res, next) {
  if(req.body.status) {
    global.log.status = req.body.status;
  }

  if(req.body.text) {
    if(global.log.log) {
      global.log.log += "\n" + req.body.text;
    } else {
      global.log.log = req.body.text;
    }
  }

  res.render('index', {
    status: global.log.status,
    logText: global.log.log,
    prevChunk: req.body.text
  });
});

router.get('/clear', function(req, res, next) {
  global.log = {};
  res.redirect('/');
});

router.get('/random', function(req, res, next) {
  fs.readFile('./fixtures/logstream_output.txt', 'utf8', function(err, data) {
    if(err) {
      console.log(err);
      return;
    }
    var blockSize = .3 * data.length;
    var upperLimit = data.length - blockSize;
    var start = Math.random() * upperLimit;
    var block = data.slice(start, start + blockSize);
    if(global.log.log) {
      global.log.log += "\n" + block;
    } else {
      global.log.log = block;
    }

  })
  res.redirect('/');
});

module.exports = router;
