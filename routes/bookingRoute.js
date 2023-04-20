const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  process.env.REACT_APP_STRIPE_SECRET_KEY
);
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/booking-car", authMiddleware, async (req, res) => {
  try {
    const token = req.body.values.token;
    const totalPrice = req.body.values.totalPrice;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: totalPrice * 100,
        currency: "pln",
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.values.transactionId = payment.source.id;
      req.body.values.isPaid = true;
      const newbooking = new Booking(req.body.values);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.values.car });
      car.bookedTimeSlots.push(req.body.values.bookedTimeSlots);
      car.isAvailable = false;

      await car.save();

      res.status(200).send({
        message: "Twoje zamówienie zostało zrealizowane pomyślnie",
        success: true,
      });
    } else {
      return res.status(400).send({
        message: "Twoje zamówienie nie zostało pomyślnie zrealizowane",
        success: false,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Nie udało się zrealizować zamówienia. Spróbuj ponownie później.",
      success: false,
      error,
    });
  }
});

router.post("/booking-without-payment", authMiddleware, async (req, res) => {
  try {
    req.body.values.isPaid = false;
    const newbooking = new Booking(req.body.values);
    await newbooking.save();

    const car = await Car.findOne({ _id: req.body.values.car });
    car.bookedTimeSlots.push(req.body.values.bookedTimeSlots);
    car.isAvailable = false;

    await car.save();

    res.status(200).send({
      message: "Twoje zamówienie zostało zrealizowane pomyślnie",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message:
        "Nie udało się zrealizować zamówienia. Spróbuj ponownie później.",
      success: false,
      error,
    });
  }
});

router.post("/get-history", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.id;

    const user = await User.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ message: "Podany użytkownik nie istnieje" });
    }

    let bookings = [];

    if (req.body.adminMode === true) {
      bookings = await Booking.find({}).populate("car");
    } else {
      bookings = await Booking.find({ user: userId }).populate("car");
    }

    res.status(200).send({
      message: "Lista wypożyczeń została zwrócona pomyślnie",
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Błąd podczas zwracania historii wypożyczeń pojazdów",
      success: false,
      error,
    });
  }
});

router.post("/search-for-bookings", authMiddleware, async (req, res) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const userId = decodedToken.id;

    let user = req.body.values.user;
    let carId = req.body.values.carId;

    const make = req.body.values.make;
    const model = req.body.values.model;
    const color = req.body.values.color;
    const from = req.body.values.from;
    const to = req.body.values.to;

    let bookings = [];

    if (req.body.adminMode === true) {
      bookings = await Booking.find({}).populate("car");
    } else {
      bookings = await Booking.find({ user: userId }).populate("car");
    }

    const filteredBookings = bookings.filter((booking) => {
      return (
        (!user || booking.user.toString() === user) &&
        (!carId || booking.car._id.toString() === carId) &&
        (!make || booking.car.make === make) &&
        (!model || booking.car.model === model) &&
        (!color || booking.car.color === color) &&
        (!from ||
          moment(booking.bookedTimeSlots.from).format("YYYY-MM-DD") >= from) &&
        (!to || moment(booking.bookedTimeSlots.to).format("YYYY-MM-DD") <= to)
      );
    });

    res.status(200).send({
      message: "Lista wyszukiwanych wypożyczeń została zwrócona pomyślnie",
      success: true,
      data: filteredBookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Błąd podczas zwracania listy wypożyczeń",
      success: false,
      error,
    });
  }
});

router.get("/get-booking-details/:bookingId", authMiddleware, async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    const booking = await Booking.findById(bookingId).populate("car");

    if (!booking) {
      return res.status(404).json({
        message: "Zamówienie o podanym numerze id nie istnieje",
      });
    }

    res.status(200).send({
      message: "Szczegóły zamówienia zostały zwrócone pomyślnie",
      success: true,
      data: booking,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Nie udało się zwrócić informacji dotyczących tego wypożyczenia",
      success: false,
      error,
    });
  }
});

module.exports = router;
