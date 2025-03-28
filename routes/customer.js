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

//ENPOINT http://localhost:5001/api/createcustomer
router.post("/createcustomer", createcustomer);
//ENPOINT http://localhost:5001/api/listcustomer
router.get("/listcustomer", listcustomer);
//ENPOINT http://localhost:5001/api/readcustomer/id
router.get("/readcustomer/:id", readcustomer);
//ENPOINT http://localhost:5001/api/updatecustomer
router.put("/updatecustomer/:id", updatecustomer);
//ENPOINT http://localhost:5001/api/daletecustomer/:id
router.delete("/daletecustomer/:id", daletecustomer);
//ENPOINT http://localhost:5001/api/addwallet
router.put("/addwallet", addWallet);
module.exports = router;
