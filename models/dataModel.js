const mongoose = require("mongoose");

const AddressSchema = new mongoose.Schema({
  "No": {
    type: String,
    required: false,
    unique: true,
  },
  "SerialNumber": {
    type: String,
    required: false,
    unique: false,
  },
  "Brand": {
    type: String,
    required: false,
    unique: false,
  },
  "Model": {
    type: String,
    required: false,
    unique: false,
  },
  "Owner": {
    type: String,
    required: false,
    unique: false,
  },
  "Department": {
    type: String,
    required: false,
    unique: false,
  },
  "Owner_1": {
    type: String,
    required: false,
    unique: false,
  },
  "Department_1": {
    type: String,
    required: false,
    unique: false,
  },
  "Owner_2": {
    type: String,
    required: false,
    unique: false,
  },
  "Department_2": {
    type: String,
    required: false,
    unique: false,
  },
}, 
{ collection: 'taskdata', }); // Explicitly set the collection name

const Address = mongoose.model('Address', AddressSchema);   

module.exports = Address;
