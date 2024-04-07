const mongoose = require('mongoose')

const contactUsSchema = mongoose.Schema({
    username : String,
    email : String,
    message : String,
    createdAt:{
        type : Date,
        default : Date.now(),
    },
})

module.exports = mongoose.model('ContactUs',contactUsSchema)