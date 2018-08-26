var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  var model = {
    title: 'Azure',
    // Pega a varivel de ambiente configurada no Azure
    message: process.env.message || 'This is development'
  }
  res.render('index', model);
});

module.exports = router;
