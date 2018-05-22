var express = require('express')
var router = express.Router()
var User = require('../models/user')

router.get('/', function (req, res) {
  res.render('index')
})

router.post('/', function (req, res) {
  User.create(req.body.data, function (err, campground) {
    if (!err) {
      res.redirect('/result?success=true')
    } else {
      res.redirect('/result?success=false')
    }
  })
})

router.get('/result', function(req, res) {
  res.render('result', { success: req.query.success })
})

router.get('/table', function(req, res) {
  User.find({}, function (err, users) {
    if (!err) {
      res.render('table', { users })
    }
  })
})

module.exports = router
