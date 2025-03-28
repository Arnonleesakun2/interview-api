const Transection = require("../models/Transection");

exports.getYearlyData = async (currentYear) => {
  // คำนวณค่า รายรับรายจ่ายรายเดือน
  const monthlyData = await Transection.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // $gteมากกว่าหรือเท่ากับ currentYear
          $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`), // $lteน้อยกว่าหรือเท่ากับ currentYear
        },
      },
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" }, type: "$type" },
        total: { $sum: "$amount" },
      },
    },
    { $sort: { "_id.month": 1 } }, //เรียงลำดับผลลัพธ์ตามเดือนจากน้อยไปมาก
  ]);

  // สร้างโครงสร้างข้อมูลให้ครบทุกเดือน
  const graphYear = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    income: 0,
    expense: 0,
  }));

  // อัปเดตค่าที่มีอยู่จริง
  monthlyData.forEach((item) => {
    const index = item._id.month - 1;
    if (item._id.type === "income") {
      graphYear[index].income = item.total;
    } else if (item._id.type === "expense") {
      graphYear[index].expense = item.total;
    }
  });
  return graphYear;
};

exports.getTotalIncomeExpense = async (currentYear) => {
  const totalIncome = await Transection.aggregate([
    {
      $match: {
        type: "income",
        createdAt: {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`), // $gteมากกว่าหรือเท่ากับ currentYear
          $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`), // $lteน้อยกว่าหรือเท่ากับ currentYear
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  const totalExpense = await Transection.aggregate([
    {
      $match: {
        type: "expense",
        createdAt: {
          $gte: new Date(`${currentYear}-01-01T00:00:00.000Z`),
          $lte: new Date(`${currentYear}-12-31T23:59:59.999Z`),
        },
      },
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$amount" },
      },
    },
  ]);

  return {
    totalIncome: totalIncome.length > 0 ? totalIncome[0].total : 0,
    totalExpense: totalExpense.length > 0 ? totalExpense[0].total : 0,
  };
};

exports.getTotalIncomeExpenseWithGrowth = async (currentYear) => {
  const previousYear = currentYear - 1; //ปีจจุบัย - 1
  const currentData = await exports.getTotalIncomeExpense(currentYear); // ดึงข้อมูลรายรับ-รายจ่ายของปีนี้
  const previousData = await exports.getTotalIncomeExpense(previousYear); // ดึงข้อมูลรายรับ-รายจ่ายของปีก่อน
  const previousIncome = previousData.totalIncome; // รายรับปีที่แล้ว
  const currentIncome = currentData.totalIncome; // รายรับปีที่ปัจจุบัน
  let incomeGrowth;
  if (previousIncome) {
    // ถ้ามีข้อมูลรายรับของปีที่แล้ว (previousIncome > 0)
    // คำนวณการเติบโตเป็นเปอร์เซ็นต์
    const incomeDifference = currentIncome - previousIncome; // ผลต่างระหว่างรายรับปีนี้และปีที่แล้ว
    const incomeGrowthPercentage = (incomeDifference / previousIncome) * 100; // คำนวณอัตราการเติบโต
    incomeGrowth = incomeGrowthPercentage; // เก็บค่าผลลัพธ์ไว้ในตัวแปร incomeGrowth
  } else {
    // ถ้าปีที่แล้วไม่มีรายรับ
    incomeGrowth = currentIncome > 0 ? 100 : 0; // ถ้าปีนี้มีรายรับจะถือว่าเติบโต 100% ถ้าไม่มีรายรับเลยจะถือว่าเติบโต 0%
  } // สุดท้าย incomeGrowth จะเก็บอัตราการเติบโตของรายรับ

  const previousExpense = previousData.totalExpense; // รายจ่ายของปีที่แล้ว
  const currentExpense = currentData.totalExpense; // รายจ่ายของปีนี้
  // คำนวณอัตราการเติบโตของรายจ่าย
  let expenseGrowth;
  if (previousExpense) {
    // ถ้ามีข้อมูลรายจ่ายของปีที่แล้ว (previousExpense > 0)
    // คำนวณการเติบโตเป็นเปอร์เซ็นต์
    const expenseDifference = currentExpense - previousExpense; // ผลต่างระหว่างรายจ่ายปีนี้และปีที่แล้ว
    const expenseGrowthPercentage = (expenseDifference / previousExpense) * 100; // คำนวณอัตราการเติบโต
    expenseGrowth = expenseGrowthPercentage; // เก็บค่าผลลัพธ์ไว้ในตัวแปร expenseGrowth
  } else {
    // ถ้าปีที่แล้วไม่มีรายจ่าย
    expenseGrowth = currentExpense > 0 ? 100 : 0; // ถ้าปีนี้มีรายจ่ายจะถือว่าเติบโต 100% ถ้าไม่มีรายจ่ายเลยจะถือว่าเติบโต 0%
  } // สุดท้าย expenseGrowth จะเก็บอัตราการเติบโตของรายจ่าย
  return {
    totalIncome: currentData.totalIncome, //รายรับทั้งหมดปีนี้
    totalExpense: currentData.totalExpense, //รายจ่ายทั้งหมดปีนี้
    incomeGrowth: incomeGrowth.toFixed(2), //อัตราการเติบโตของรายรับ ปัดเศษเป็นทศนิยม 2 ตำแหน่ง
    expenseGrowth: expenseGrowth.toFixed(2), //อัตราการเติบโตของรายจ่าย ปัดเศษเป็นทศนิยม 2 ตำแหน่ง
  };
};
