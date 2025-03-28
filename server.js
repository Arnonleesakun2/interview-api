const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();
const hdlerror = require("./middlewere/hdlError");
const { readdirSync } = require("fs");
const bodyParser = require("body-parser");
const connectDB = require("./config/database");

connectDB();
//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "5mb" }));

app.use(hdlerror);
//routes

readdirSync("./routes").map((e) => {
  return app.use("/api", require(`./routes/${e}`));
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server Is Running on port ${PORT}`);
});

module.exports = app;
