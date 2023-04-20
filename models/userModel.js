const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    firstName: {
      type: String,
      default: null,
    },
    surname: {
      type: String,
      default: null,
    },
    phoneNumber: {
      type: Number,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      default: null,
    },
    sex: {
      type: String,
      default: null,
    },
    favorites: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'cars',
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
