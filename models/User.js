const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  phone: { type: String, unique: true },
  password: String,
  rollNo: String,
  email: String,

  // ✅ trial fields
  trialStartDate: {
    type: Date,
  },
  trialEndDate: {
    type: Date,
  },
  isSubscribed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("User", UserSchema);