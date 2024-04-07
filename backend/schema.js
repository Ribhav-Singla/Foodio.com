const Joi = require('joi');

module.exports.reviewSchema = Joi.object({
    review : Joi.object({
        username : Joi.string().required(),
        rating : Joi.number().min(1).max(5).required(),
        message : Joi.string().required()
    }).required()
});

module.exports.checkoutSchema = Joi.object({
    username : Joi.string().required(),
    phoneNumber : Joi.number().required(),
    email : Joi.string().required(),
    shippingAddress : Joi.string().required(),
    paymentMethod : Joi.string().required(),
    orderDetails : Joi.string().required(),
});

module.exports.reservationSchema = Joi.object({
    username : Joi.string().required(),
    phonenumber : Joi.number().required(),
    email : Joi.string().required(),
    date : Joi.date().required(),
    time : Joi.string().required(),
    partySize : Joi.number().min(1).max(8).required(),
});

module.exports.contactUsSchema = Joi.object({
    username : Joi.string().required(),
    email : Joi.string().required(),
    message : Joi.string().required(),
});