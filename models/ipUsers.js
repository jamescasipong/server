const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    "ip": Array,
    "track": String
}, { collection: 'ipaddress' });

const IPAddress = mongoose.model("ipaddress", ipSchema);

module.exports = IPAddress;

