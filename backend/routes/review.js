require('dotenv').config()
const express = require("express");
const Review = require("../models/review.js");
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const ExpressError = require('../utils/ExpressError.js');
const {reviewSchema} = require('../schema.js');
const {isLoggedIn} = require('../middleware.js');
const router = express.Router();

// review
router.get("/", wrapAsync(async (req, res) => {
  await Review.find({})
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
}));

router.post("/", isLoggedIn ,wrapAsync(async (req, res) => {
  let {error} = reviewSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error)
  }
  let { review } = req.body;
  review.owner = req.user._id;
  let newReview = new Review(review);
  await newReview.save();

  let registeredUser = await User.findById(req.user._id);
  registeredUser.reviews.push(newReview._id);
  registeredUser.save();
  
  res.redirect(process.env.FRONTEND_URL);
}));

router.delete("/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  // Convert ObjectIds to strings before comparison
  const reviewOwnerId = review.owner._id.toString();
  const reqUserId = req.user._id.toString();

  if (reviewOwnerId !== reqUserId) {
    res.send('owner');
  } else {
    const deletedReview = await Review.findByIdAndDelete(id);
    const registeredUser = await User.findById(deletedReview.owner._id);

    // Remove the review ID from the user's reviews array
    const index = registeredUser.reviews.indexOf(id);
    if (index !== -1) {
      registeredUser.reviews.splice(index, 1);
      await registeredUser.save();
    }

    res.send("deleted successfully");
  }
}));


module.exports = router;
