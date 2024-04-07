const express = require("express");
const ContactUs = require("../models/contactUs.js");
const wrapAsync = require('../utils/wrapAsync.js');
const {contactUsSchema} = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const {isLoggedIn} = require('../middleware.js');
const router = express.Router();

router.post("/", isLoggedIn ,wrapAsync(async (req, res) => {
  let {error} = contactUsSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  let { username, email, message } = req.body;
  let newContactUs = new ContactUs({ username, email, message });
  await newContactUs.save();
  res.send("success");
}));

module.exports = router;
