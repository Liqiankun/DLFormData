var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = Schema({
  name: String,
  email: String,
  company: String,
  company_type: String,
  position: String
})

module.exports = mongoose.model('User', UserSchema)
