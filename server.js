const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataRoute = require("./routes/dataRoute.js");
const paymentRoutes = require("./routes/paymentRoutes.js");
const { generateApiKey } = require('generate-api-key');
const payment = require("./models/payment.js");
require('dotenv').config()
 
const isLocal = false;


const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://monitoring-task.vercel.app'];

const requestIp = require('request-ip');


// Middleware to extract client IP
app.use(requestIp.mw());

app.get('/api/ip', (req, res) => {
    let ip = req.clientIp;

    // Check if the IP is IPv6 and adjust if necessary
    if (ip.includes(':')) {
        const forwardedIps = req.headers['x-forwarded-for'];
        if (forwardedIps) {
            // Take the first IP from the forwarded list
            ip = forwardedIps.split(',')[0];
        }
    }

    // Regex to validate IPv4
    const isIPv4 = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

    if (isIPv4.test(ip)) {
        res.send(`Your IPv4 address is: ${ip}`);
    } else {
        res.send(`Could not determine an IPv4 address. Detected IP: ${ip}`);
    }
});

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,}));


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

app.use(`/api/payments`,  paymentRoutes);

app.use(`/api/dataRoute`, dataRoute);

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