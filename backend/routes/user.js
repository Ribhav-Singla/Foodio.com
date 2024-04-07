const express = require("express");
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {isLoggedIn} = require('../middleware.js');
const router = express.Router();

router.get('/user',isLoggedIn,async(req,res)=>{
  res.send(req.user);
})

router.post(
  "/signup",
  wrapAsync(async (req, res) => {
    try {
      let { username, email, password } = req.body;
      const newUser = new User({ username, email });
      const registerdUser = await User.register(newUser, password);
      console.log(registerdUser);
      req.login(registerdUser,(err)=>{
        if(err){
          return next(err);
        }
        res.send("success");
      })
    } catch (error) {
      res.send(error);
    }
  })
);

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.send("error");
    }
    // If user exists, proceed to the next middleware
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.send("success");
    });
  })(req, res, next);
});

router.get('/logout',(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      return next(err);
    }
  })
  res.send('success');
})

module.exports = router;
