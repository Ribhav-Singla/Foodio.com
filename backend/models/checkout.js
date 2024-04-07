const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const checkoutSchema = mongoose.Schema({
    username : String,
    phoneNumber : Number,
    email : String,
    shippingAddress : String,
    paymentMethod : String,
    orderDetails : String,
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'User',
    },
    createdAt:{
        type : Date,
        default : Date.now(),
    },
})

module.exports = mongoose.model('Checkout',checkoutSchema);