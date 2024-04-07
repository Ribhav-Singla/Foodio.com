const express = require("express");
const Reservation = require("../models/reservation.js");
const User = require('../models/user.js');
const wrapAsync = require('../utils/wrapAsync.js');
const {reservationSchema} = require('../schema.js');
const ExpressError = require('../utils/ExpressError.js');
const router = express.Router();

router.post("/", wrapAsync(async (req, res) => {
  let {error} = reservationSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  const newReservation = new Reservation(req.body);
  newReservation.owner = req.user._id;
  newReservation.save();

  const registeredUser = await User.findById(req.user._id);
  registeredUser.reservations.push(newReservation._id);
  registeredUser.save();

  const id = newReservation._id;
  res.redirect(`/reservation/confirmation/${id}`);
}));

router.delete("/cancel/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const deletedReservation = await Reservation.findByIdAndDelete(id);

  const registeredUser = await User.findById(deletedReservation.owner);
  const index = registeredUser.reservations.indexOf(id);
  if (index !== -1) {
    registeredUser.reservations.splice(index, 1);
    await registeredUser.save();
  }

  res.send("success");
}));

router.post("/confirmation/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const ReservationData = await Reservation.findById(id);
  if (!ReservationData) {
    res.send("error");
  }
  res.send(ReservationData);
}));

router.post("/Edited/:id", wrapAsync(async (req, res) => {
  let {error} = reservationSchema.validate(req.body);
  if(error){
    throw new ExpressError(400,error);
  }
  let { id } = req.params;
  await Reservation.findByIdAndUpdate(id, req.body);
  res.redirect(`/reservation/confirmation/${id}`);
}));

module.exports = router;
