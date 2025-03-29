const express = require("express");
const router = express.Router();
const {
  createcustomer,
  listcustomer,
  readcustomer,
  updatecustomer,
  daletecustomer,
  addWallet
} = require("../controllers/customer");

//ENPOINT https://interview-api-2cgt.onrender.com/api/createcustomer
router.post("/createcustomer", createcustomer);
//ENPOINT https://interview-api-2cgt.onrender.com/api/listcustomer
router.get("/listcustomer", listcustomer);
//ENPOINT https://interview-api-2cgt.onrender.com/api/readcustomer/id
router.get("/readcustomer/:id", readcustomer);
//ENPOINT https://interview-api-2cgt.onrender.com/api/updatecustomer
router.put("/updatecustomer/:id", updatecustomer);
//ENPOINT https://interview-api-2cgt.onrender.com/api/daletecustomer/:id
router.delete("/daletecustomer/:id", daletecustomer);
//ENPOINT https://interview-api-2cgt.onrender.com/api/addwallet
router.put("/addwallet", addWallet);


module.exports = router;
