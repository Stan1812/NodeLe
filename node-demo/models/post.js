var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var postschema = new Schema({
    title:{
        type:String
    },
    content:{
        type:String
    },
    username:{
        type:String
    },
    postdate:{
        type:String
    }
})
module.exports = mongoose.model('posts', postschema);
