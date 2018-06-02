var express = require('express')
var methodOverride = require('method-override')
var bodyParser = require('body-parser')
var mongoose = require('mongoose')
var app = express()
var formRoutes = require('./routes/form')

mongoose.connect('mongodb://baonar:5DaO6ci74u@ds231090.mlab.com:31090/form_data')

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')
app.use(express.static(`${__dirname}` + '/public'))

app.use(methodOverride('_method'))

app.use(formRoutes)

console.log('port', process.env.PORT, process.env.IP)

app.listen(process.env.PORT || 5000, process.env.IP, function () {
  console.log('YelpCamp server has started!')
})
