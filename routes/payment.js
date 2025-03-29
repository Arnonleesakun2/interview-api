const express = require("express");
const { payOrder, listOrder ,readOrder} = require("../controllers/payment");
const router = express.Router();

//ENDPOINT https://interview-api-2cgt.onrender.com/api/payorder
router.post("/payorder", payOrder);
//ENDPOINT https://interview-api-2cgt.onrender.com/api/listorder
router.get("/listorder", listOrder);
//ENDPOINT https://interview-api-2cgt.onrender.com/api/readorder
router.get("/readorder", readOrder);


module.exports = router;
