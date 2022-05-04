const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    long_url:{type:String,unique:true,
    short_url:{type:Date,unique:true,index:true}}, 
    status:{type:String},
},{timestamp:true});

// We are storing timestamp in order to expire the URLs if needed
module.exports = mongoose.model('url',urlSchema);