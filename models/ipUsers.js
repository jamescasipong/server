const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    ip: String
}, { collection: 'ipaddress' });

const IPAddress = mongoose.model("ipaddress", ipSchema);

module.exports = IPAddress;

