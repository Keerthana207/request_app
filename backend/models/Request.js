const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
 name:String,
  title: String,
  description: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Request", requestSchema);
