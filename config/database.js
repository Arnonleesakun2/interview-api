require("dotenv").config(); // โหลดค่าจาก .env

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error("Error connecting to DB: ", err);
  }
};

module.exports = connectDB;
