const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRoute = require("./routes/dataRoute.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const { generateApiKey } = require('generate-api-key');
const payment = require("./models/payment.js");
require('dotenv').config()
const path = require('path');

const isLocal = false;


const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://monitoring-task.vercel.app'];

const requestIp = require('request-ip');


// Middleware to extract client IP

// Catch-all route for undefined routes




app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,}));


app.use(requestIp.mw())







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



const allowedIPs = ['124.83.41.231', '152.32.99.73'];

app.use((req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  if (!allowedIPs.includes(ip)) {
    console.log()
    return res.status(403).send(ip);
  }
  next();
});

app.get('/api/dataRoute/ipsz', (req, res) => {
  res.json({ ip: req.ip });
});

app.use(`/api/payments`,  paymentRoutes);

app.use(`/api/dataRoute`, dataRoute);



app.use((req, res, next) => {
  res.status(404);

  next();
})


const connectDB = async (callback) => {

  try {
    isLocal
      ? await mongoose.connect("mongodb://localhost:27017/SysTracker")
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


/*app.use((req, res, next) => {
  // Assume `apiKeys` is stored in environment variables or similar
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).send('API key is not configured.');
  }

  // Set the API key in the headers for the downstream service
  req.headers['Authorization'] = `Bearer ${apiKey}`;
  next();
});


app.use((req, res, next) => {
  // Assume `apiKeys` is stored in environment variables or similar
  
  if (!apiKey) {
    return res.status(500).send('API key is not configured.');
  }

  // Set the API key in the headers for the downstream service
  req.headers['Authorization'] = `Bearer ${apiKey}`;
  next();
});


app.use('/api/payments', (req, res, next) => {
  if (req.headers['authorization'] !== `Bearer ${apiKey}`) {
    return res.status(403).send('Forbidden');
  }
  next();
}, paymentRoutes);*/