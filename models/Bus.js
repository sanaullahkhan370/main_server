const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema({
  busId: { type: String, required: true },

  location: {
    lat: Number,
    lng: Number,
  },

  speed: { type: Number, default: 0 },

  driver: {
    name: String,
    phone: String,
  },

  updatedAt: { type: Date, default: Date.now }
});

BusSchema.index({ busId: 1 });

module.exports = mongoose.model("Bus", BusSchema, "buses");