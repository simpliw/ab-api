var mongoose = require('mongoose')
, Schema = mongoose.Schema;


var billSchema = new Schema({
    "userId":String,
    "symbol":String,
    "money":String,
    "createDate":Date
});

module.exports = mongoose.model('Bill', billSchema);