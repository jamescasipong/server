const mongoose = require("mongoose");

const RowSchema = new mongoose.Schema({
  months: [String],
  values: [String],
});

const PaymentTableSchema = new mongoose.Schema({
  name: String,
  rows: [RowSchema],
});

const PaymentSchema = new mongoose.Schema({
  tables: [PaymentTableSchema],
});

module.exports = mongoose.model("Payment", PaymentSchema);
