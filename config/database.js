const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING);
    console.log(`Connected to Database`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectDB;
