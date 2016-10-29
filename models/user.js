
var mongoose = require('mongoose')
,Schema = mongoose.Schema;

var userSchema = new Schema({
    "username":String,
    "password":String,
    "email":String,
    "phone":String,
    "address":String,
    "gender":String,
    "createDate":{
        type: Date,
        default: Date.now()
    },
    "updateDate":{
        type: Date,
        default: Date.now()
    },
})

module.exports = mongoose.model('User',userSchema)