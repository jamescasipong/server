  const express = require("express");
  const Address = require("../models/dataModel");
  const router = express.Router();
  const XLSX = require('xlsx');
  const { Error } = require("mongoose");



  //Route for "/" path with bunch of middlewares

  router.get("/", async (req, res) => {
    try {

      const user = await Address.find({})
      
      res.json(user);
    } catch (err) {
      console.log("err: ", err);
      res.status(500).json({ message: "Error Fetching users" });
    }
  });

  router.get('/export/excel', async (req, res) => {
    try {
      // Fetch data from the database, excluding _id and __v fields
      const data = await Address.find({}, { _id: 0, __v: 0 }).lean(); // Proper projection
  
      // Send data as JSON
      console.log(data);

      res.json(data);
    } catch (error) {
      res.status(500).send('Failed to fetch data: ' + error.message);
    }
  });
  
  router.delete("/", async (req, res)=>{

      try {

          const result = await Address.deleteMany({});

          if(!result){

              return res.status(404).json({message: "there was no found"})
          }

          res.json("Deleted!")
      }catch(err){
          res.status(505).json({message: "Error!"})
      }
  })

  router.post('/api/data', async (req, res) => {
    try {
      const jsonData = req.body;
  
      // Check if jsonData is an array, otherwise return 404.
      if (!Array.isArray(jsonData)) {
        return res.status(400).send('Invalid data format: expected an array.');
      }
  
      // Save to MongoDB
      await Address.insertMany(jsonData);
  
      res.status(200).send('Data saved successfully');
    } catch (error) {
      console.error('Error saving data:', error); // Log the error
      res.status(500).send('Error saving data: ' + error.message);
    }
  });
  

  router.post('/add-device', async (req, res) => {
    try {
      const newDevice = new Address(req.body);
      const savedDevice = await newDevice.save();
      res.status(201).json(savedDevice);
    } catch (error) {
      res.status(500).json({ message: 'Error adding device', error });
    }
  });
  
  // Delete a device
  router.delete('/delete-device/:id', async (req, res) => {
    try {
      const deviceId = req.params.id;
      const deletedDevice = await Address.findByIdAndDelete(deviceId);
      if (!deletedDevice) {
        return res.status(404).json({ message: 'Device not found' });
      }
      res.status(200).json({ message: 'Device deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting device', error });
    }
  });


  router.put('/update-device/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedData = req.body;
      console.log("updatedData", updatedData)
      const device = await Address.findByIdAndUpdate(id, updatedData, { new: true });
      if (!device) {
        return res.status(404).json({ message: 'Device not found' });
      }
      res.json(device);

      console.log("device", device);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });



  router.delete("/user/:SerialNumber", async (req, res) => {
      const {SerialNumber} = req.params; // Corrected parameter name
      
      try {
        const result = await Address.findOneAndDelete( {"No": SerialNumber} );

          

        if (!result) {
          return res.status(404).json({ message: "User not found" });
        }


        res.json({conveyedMessage: "It's working perfectly"});
      } catch (err) {
        console.log("err: ", err);
        res.status(500).json({ message: "Error deleting user" });
      }
  });
    

  module.exports = router; // Use CommonJS export
