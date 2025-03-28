const Order = require("../models/Order");
const Customer = require("../models/Customer");

exports.payOrder = async (req, res, next) => {
  try {
    const { customerId, productName, productPrice } = req.body;
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ msg: "Customer not found" });
    }

    //ดึงส่วนลดจาก Customer
    const disCount = customer.rate_discount || 0;
    // นำ ราคาสินค้า - ส่วนลดที่คำนวณใน()
    const finalPrice = productPrice - (productPrice * disCount) / 100;

    // ตรวจสอบว่าเงินพอหรือไม่
    if (customer.wallet < finalPrice) {
      return res.status(400).json({ msg: "Insufficient wallet balance" });
    }
    // หักเงินจาก wallet
    customer.wallet -= finalPrice;
    await customer.save();

    const result = await Order({
      customerId,
      productName,
      productPrice,
      finalPrice,
    }).save();
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.listOrder = async (req, res, next) => {
  try {
    const result = await Order.find({}).exec();
    if (!result || result.length === 0) {
      return res.status(404).json({ msg: "Don't Have Data" });
    }
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.readOrder = async (req, res, next) => {
  try {
    const id = req.body.customerId;
    const result = await Order.find({ customerId: id }).exec();
    if (!result || result.length === 0) {
      return res.status(404).json({ msg: "Don't Have Data" });
    }
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};
