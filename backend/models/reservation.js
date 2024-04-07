const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const reservationSchema = mongoose.Schema({
    username : String,
    phonenumber : Number,
    email : String,
    date : Date,
    time : String,
    partySize : Number,
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    createdAt:{
        type : Date,
        default : Date.now(),
    },
})

module.exports = mongoose.model('Reservation',reservationSchema)