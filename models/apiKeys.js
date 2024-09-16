const mongoose = require("mongoose");


const apiSchema = new mongoose.Schema({
    apiKeys: String
})

module.exports = mongoose.model("ApiKeys", apiSchema);
