const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRoute = require("./routes/dataRoute.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const { generateApiKey } = require('generate-api-key');
require('dotenv').config()
 


const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://monitoring-task.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  const startTime = Date.now();


  // Listen for the response to finish
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    console.log(`Request: ${req.method} ${req.url} took ${duration}ms`);
  });
  
  next();
});


app.use(`/api/${process.env.API_KEY}/payments`, paymentRoutes);

app.use(`/api/${process.env.API_KEY}/dataRoute`, dataRoute);

const connectDB = async (callback) => {
  const isLocal = false;
  try {
    isLocal
      ? await mongoose.connect("mongodb://localhost:27017/wSysTracker")
      : await mongoose.connect(process.env.MONGO_URI);

    callback(isLocal);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.log("Database connection error:", err);
  }
};

const checkIsLocal = (isLocal) => {
  if (!isLocal) {
    console.log("You are working in a production!");
  } else {
    console.log("Working on a local");
  }
};

connectDB(checkIsLocal);

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
