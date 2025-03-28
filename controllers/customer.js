const Customer = require("../models/Customer");
const bcrypt = require("bcrypt");

exports.createcustomer = async (req, res, next) => {
  try {
    const checkEmail = await Customer.findOne({ email: req.body.email });
    if (checkEmail) {
      return res.status(400).json({
        msg: "Email already exists",
      });
    }
    const result = await Customer(req.body).save();
    res.json({ msg: "Create Customer Success ", result: result });
  } catch (err) {
    next(err);
  }
};

exports.listcustomer = async (req, res, next) => {
  try {
    const result = await Customer.find({}).exec();
    if(!result || result.length === 0){
      return res.status(404).json({ msg: "Don't Have Data" });
    }
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.readcustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Customer.findOne({ _id: id }).exec();
    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.updatecustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    //ถ้าส่งpasswordมา ก้เข้ารหัส
    if (req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }
    const result = await Customer.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    }).exec();
    res.json({ msg: "Update Customer Success ", result: result });
  } catch (err) {
    next(err);
  }
};

exports.daletecustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Customer.findOneAndDelete({ _id: id }).exec();
    if(!result){
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.json({ msg: "Delete Customer Success ", result: result });
  } catch (err) {
    next(err);
  }
};

exports.addWallet = async (req, res, next) => {
  try {
    const { id, wallet_topup } = req.body;
    if (!wallet_topup || wallet_topup <= 0) {
      return res.status(400).json({ msg: "Invalid topup amount" }).exec();
    }
    const result = await Customer.findByIdAndUpdate(
      id,
      { $inc: { wallet: wallet_topup } }, // เพิ่มเงินใน wallet
      { new: true }
    ).exec();
    if (!result) {
      return res.status(404).json({ msg: "Customer not found" });
    }
    res.json({
      msg: "Wallet top-up successful",
      result: result,
    });
  } catch (err) {
    next(err);
  }
};
