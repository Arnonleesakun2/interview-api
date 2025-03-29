const express = require("express");
const {
  createTransection,
  listTransection,
} = require("../controllers/transection");
const router = express.Router();

//ENDPOINT https://interview-api-2cgt.onrender.com/api/createtransection
router.post("/createtransection", createTransection);
//ENDPOINT https://interview-api-2cgt.onrender.com/api/listtransection
router.get("/listtransection", listTransection);

module.exports = router;
