var express = require('express')
var router = express.Router()
var User = require('../models/user')
var excel = require('node-excel-export')

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

router.get('/excel', function(req, res) {
  const styles = {
    headerDark: {
      fill: {
        fgColor: {
          rgb: 'FF000000'
        }
      },
      font: {
        color: {
          rgb: 'FFFFFFFF'
        },
        sz: 14,
        bold: true,
        underline: true
      }
    },
    cellPink: {
      fill: {
        fgColor: {
          rgb: 'FFFFCCFF'
        }
      }
    },
    cellGreen: {
      fill: {
        fgColor: {
          rgb: 'FF00FF00'
        }
      }
    }
  }

  const specification = {
    name: {
      displayName: 'Name',
      headerStyle: styles.headerDark,
      width: 120
    },
    email: {
      displayName: 'Email',
      headerStyle: styles.headerDark,
      width: 200
    },
    company: {
      displayName: 'Company',
      headerStyle: styles.headerDark,
      width: 220
    },
    company_type: {
      displayName: 'Company Type',
      headerStyle: styles.headerDark,
      width: 220
    },
    position: {
      displayName: 'Position',
      headerStyle: styles.headerDark,
      width: 220
    }
  }
  User.find({}, function (err, users) {
    if (!err && req.query.password === 'export-excel') {
      const report = excel.buildExport(
        [
          {
            name: 'Report',
            specification: specification,
            data: users
          }
        ]
      )
      res.attachment('report.xlsx')
      return res.send(report)
    }
  })
})

module.exports = router
