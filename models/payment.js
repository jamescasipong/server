// models/payment.js
const mongoose = require("mongoose");

const RowSchema = new mongoose.Schema({
  months: [String],
  values: [String],
});

const PaymentSchema = new mongoose.Schema({
  rows: [RowSchema],
});

module.exports = mongoose.model("Payment", PaymentSchema);
