const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema(
{
  name: {
    type: String,
    required: true
  },

  type: {
    type: String,
    required: true
  },

  title: {
    type: String,
    required: true
  },

  description: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: "Pending"
  }

},

);

module.exports = mongoose.model("Request", requestSchema);