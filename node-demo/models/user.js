var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var userschema = new Schema({
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: Number
})
module.exports = mongoose.model('users', userschema);
