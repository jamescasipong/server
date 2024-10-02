const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    "ip": Array
}, { collection: 'ipaddress' });

const IPAddress = mongoose.model("ipaddress", ipSchema);

module.exports = IPAddress;

