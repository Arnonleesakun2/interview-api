const mongoose = require("mongoose");

const transectionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("transection", transectionSchema);
