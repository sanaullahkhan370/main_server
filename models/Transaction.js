const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  tid: String,
  amount: Number,
  isUsed: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Transaction", transactionSchema);