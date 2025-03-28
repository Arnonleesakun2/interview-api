const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    tel: { type: String, required: true },
    rate_discount: { type: Number, default: null },
    wallet: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);
// Encrypt password
customerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    //เช็คว่า รหัสผ่านถูกแก้ไขหรือไม่
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("customer", customerSchema);
