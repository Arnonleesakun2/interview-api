const hdlerror = (err, req, res, next) => {
  res
    .status(err.statuscode || 500)
    .json({ message: err.message || "Somthing Worng!!!" });
};

module.exports = hdlerror;
