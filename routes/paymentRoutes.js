// routes/paymentRoutes.js
const express = require("express");
const Payment = require("../models/payment.js");

const router = express.Router();

// Route to save payment data
router.post("/save", async (req, res) => {
  try {
    // Clear existing data and save new data
    await Payment.deleteMany({});
    await Payment.create({ rows: req.body.rows });
    res.status(201).json({ message: "Payment data saved successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error saving payment data", error });
  }
});

// Route to retrieve payment data
router.get("/get", async (req, res) => {
  try {
    const payments = await Payment.findOne(); // Assuming one document
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving payment data", error });
  }
});

module.exports = router;
