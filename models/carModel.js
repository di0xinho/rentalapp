const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    make: { type: String, required: true },
    model: { type: String, required: true },
    capacity: { type: Number, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    bodyType: { type: String, required: true },
    gearboxType: { type: String, required: true },
    mileage: { type: Number, required: true },
    fuelType: { type: String, required: true },
    hourlyPrice: { type: Number, required: true },
    imageUrl: { type: String },
    description: { type: String },
    bookedTimeSlots: [
      {
        from: { type: String, required: true },
        to: { type: String, required: true },
      },
    ],
    isAvailable: { type: Boolean, required: true, default: true },
  },

  {
    timestamps: true,
  }
);

const carModel = mongoose.model("cars", carSchema);

module.exports = carModel;
