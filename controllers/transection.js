const Transection = require("../models/Transection");

exports.createTransection = async (req, res, next) => {
  try {
    const { title, type, amount } = req.body;
    if (!["income", "expense"].includes(type)) {
      return res
        .status(400)
        .json({ msg: "Invalid type, must be 'income' or 'expense'" });
    }
    const result = await Transection({ title, type, amount }).save();

    res.json({ result: result });
  } catch (err) {
    next(err);
  }
};

exports.listTransection = async (req, res, next) => {
  try {
    let { startDate, endDate, type } = req.query;
    let filter = {};
    //ถ้ามีค่า startDate, endDate ส่งมาก้ยัดค่าเข้า filter
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate), // $gteมากกว่าหรือเท่ากับ startDate
        $lte: new Date(endDate), // $lteน้อยกว่าหรือเท่ากับ endDate
      };
    }
    //ถ้ามีค่า type ส่งมาก้ยัดค่าเข้า filter
    if (type) {
      filter.type = type;
    }
    const result = await Transection.find(filter).sort({ createdAt: -1 });
    if (!result || result.length === 0) {
      return res.status(404).json({ msg: "Don't Have Data" });
    }

    // คำนวณรายรับ (income) ถ้าไม่มี filter type
    const totalIncome = await Transection.aggregate([
      { $match: { ...filter, type: "income" } }, // ใช้ filter + type: "income"
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    // คำนวณรายจ่าย (expense) ถ้าไม่มี filter type
    const totalExpense = await Transection.aggregate([
      { $match: { ...filter, type: "expense" } }, // ใช้ filter + type: "expense"
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const incomeAmount = totalIncome.length > 0 ? totalIncome[0].total : 0;
    const expenseAmount = totalExpense.length > 0 ? totalExpense[0].total : 0;
    const balance = incomeAmount - expenseAmount;
    res.json({
      result: result,
      totalIncome: incomeAmount,
      totalExpense: expenseAmount,
      balance: balance,
    });
  } catch (err) {
    next(err);
  }
};
