const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: String,
  city: String,
  phoneNumber: String,
  organization: String,
});

module.exports = mongoose.model("Contact", contactSchema);
