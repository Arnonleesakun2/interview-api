const express = require("express");
const { payOrder, listOrder ,readOrder} = require("../controllers/payment");
const router = express.Router();

//ENDPOINT http://localhost:5001/api/payorder
router.post("/payorder", payOrder);
//ENDPOINT http://localhost:5001/api/listorder
router.get("/listorder", listOrder);
//ENDPOINT http://localhost:5001/api/readorder
router.get("/readorder", readOrder);
module.exports = router;
