const mongoose = require("mongoose");

const ipSchema = new mongoose.Schema({
    ip: String
}, { collection: 'ipaddress' });

module.exports = mongoose.model("ipaddress", ipSchema);
