require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const reviewRouter = require("./routes/review.js");
const contactUsRouter = require("./routes/contactUs.js");
const reservationRouter = require("./routes/reservation.js");
const checkoutRouter = require("./routes/checkout.js");
const userRouter = require('./routes/user.js');
const ExpressError = require('./utils/ExpressError.js');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
const app = express();
const cors = require('cors');
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  credentials: true
}))

const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL

// database connection
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("database connected"))
  .catch((err) => console.log(err));

const sessionOptions = {
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized: true,
  cookie : {
    expires : Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge : 7 * 24 * 60 * 60 * 1000,
    httpOnly : true,
  }
}

app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:5173', 'https://foodio-com-project.onrender.com', 'http://foodio-com-project.onrender.com'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});
  
// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// app.get('/demouser',async(req,res)=>{
//   let fakeUser = new User({
//     email : "student@gmail.com",
//     username : 'delta-student'
//   });

//   let registerdUser = await User.register(fakeUser,"helloworld");
//   res.send(registerdUser);
// })

// home
app.get("/api", (req, res) => {
  res.send("home route");
});

// review
app.use("/api/review", reviewRouter);

// contactUS
app.use("/api/contactUs", contactUsRouter);

// Reservation
app.use("/api/reservation", reservationRouter);

// Checkout
app.use("/api/checkout", checkoutRouter);

// user
app.use('/api',userRouter);

app.all('*',(req,res,next)=>{
  next(new ExpressError(404,'Page not found') )
})

app.use((err,req,res,next)=>{
  let {statusCode=500, message="something went wrong"} = err;
  res.status(statusCode).send(message);
})

app.listen(PORT, () => {
  console.log(`server started on http://localhost:${PORT}/`);
});
