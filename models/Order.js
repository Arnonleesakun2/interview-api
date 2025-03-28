const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    finalPrice: { type: Number, required: true }, 
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("order", orderSchema);
