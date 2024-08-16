require('dotenv').config()
const express = require("express");
const Checkout = require("../models/checkout.js");
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {checkoutSchema} = require('../schema.js');
const router = express.Router();

router.post("/", wrapAsync(async (req, res) => {
  let {error} = checkoutSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  const newCheckout = new Checkout(req.body);
  newCheckout.owner = req.user._id;
  await newCheckout.save(); 
  
  const registerdUser =await User.findById(req.user._id);
  registerdUser.orders.push(newCheckout._id);
  registerdUser.save();

  const id = newCheckout._id;
  res.redirect(`${process.env.FRONTEND_URL}/orderSuccess/${id}`);
}));

module.exports = router;
