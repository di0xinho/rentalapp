const express = require('express');

const app = express();
require("dotenv").config();
const stripe = require("stripe")("");
const dbConfig = require("./db/connection");
app.use(express.json());
const userRoute = require("./routes/userRoute");
const adminRoute = require("./routes/adminRoute");
const carRoute = require("./routes/carRoute");
const bookingRoute = require("./routes/bookingRoute");
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/cars", carRoute);
app.use("/api/bookings", bookingRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serwer nasłuchuje na porcie: ${port}`);
});
