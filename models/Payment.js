const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  userId: String,
  amount: String,
  txnId: String,
  image: String,
  rawText: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Payment", PaymentSchema);