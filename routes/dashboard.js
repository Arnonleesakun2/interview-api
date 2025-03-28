const express = require("express");
const router = express.Router();
const { dashboardStatus } = require("../controllers/dashboard");

// Endpoint http://localhost:5001/api/dashboard
router.get("/dashboard", dashboardStatus);

module.exports = router;
