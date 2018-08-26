var express = require('express');
var router = express.Router();
var db = require('../data/userdb');

router.get('/', (req, res, next) => {
  db.queryUsers((err, rowCount, rows) => {
    if (err) return next(err);
    res.send(rows);
  });
});

router.put('/', function (req, res, next) {
  var data = req.body;
  db.createUsers(data, (err, rowCount, row) => {
    if (err) return next(err);
    res.send(`Added ${rowCount} records`)
  });
});

module.exports = router;
