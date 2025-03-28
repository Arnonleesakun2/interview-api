require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ DB Connected");
  } catch (err) {
    console.error("❌ Error connecting to DB:", err);
    process.exit(1); // ปิดโปรแกรมถ้าเชื่อมต่อไม่ได้
  }
};

module.exports = connectDB;