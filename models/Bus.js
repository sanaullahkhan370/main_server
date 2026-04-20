const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  busId: { type: String, required: true },

  latitude: Number,
  longitude: Number,

  speed: { type: Number, default: 0 },

  driverName: String,
  phoneNumber: String,

  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Bus", BusSchema, "buses");