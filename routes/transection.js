const express = require("express");
const {
  createTransection,
  listTransection,
} = require("../controllers/transection");
const router = express.Router();

//ENDPOINT http://localhost:5001/api/createtransection
router.post("/createtransection", createTransection);
//ENDPOINT http://localhost:5001/api/listtransection
router.get("/listtransection", listTransection);

module.exports = router;
