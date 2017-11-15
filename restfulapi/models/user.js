var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userschema = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    }
})
module.exports = mongoose.model('user', userschema);
