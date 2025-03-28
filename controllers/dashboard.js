const {
  getYearlyData,
  getTotalIncomeExpenseWithGrowth,
} = require("../services/dashboardservice");

exports.dashboardStatus = async (req, res, next) => {
  try {
    const currentYear = new Date().getFullYear();//ปีปัจุบัน

    const graphYear = await getYearlyData(currentYear);
    const result = await getTotalIncomeExpenseWithGrowth(currentYear);

    res.json({
      graphYear: graphYear,
      result: result,
    });
  } catch (err) {
    next(err);
  }
};
