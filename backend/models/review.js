const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reviewSchema = mongoose.Schema({
    username : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    message : String,
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    createdAt:{
        type : Date,
        default : Date.now(),
    },
})

module.exports = mongoose.model('Review',reviewSchema);
