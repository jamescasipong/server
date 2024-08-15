const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataModel = require("./routes/dataRoute.js"); // Use require for imports

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use("/", dataModel);



const connectDB = async (callback) => {
  const isLocal = false;
  try {
    /*await mongoose.connect("mongodb+srv://jamesxcasipong:!Unravel12345@cluster0.yqpkrko.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=Cluster0");*/
    isLocal ? await mongoose.connect("mongodb://localhost:27017/SysTracker") : await mongoose.connect("mongodb+srv://jamesxcasipong:!Unravel12345@cluster0.yqpkrko.mongodb.net/NODE-API?retryWrites=true&w=majority&appName=Cluster0");

    if (!isLocal)
      
    callback(isLocal);
    console.log("MongoDB connected successfully.");
  } catch (err) {
    console.log("Database connection error:", err);
  }
};

const XD = (isLocal) => {
  if (!isLocal){
    console.log("You are working in a production!");
    
  }
  else{
    console.log("Working on a local");
  }
}

connectDB(XD());


const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
