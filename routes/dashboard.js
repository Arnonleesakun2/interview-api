const express = require("express");
const router = express.Router();
const { dashboardStatus } = require("../controllers/dashboard");

// Endpoint https://interview-api-2cgt.onrender.com/api/dashboard
router.get("/dashboard", dashboardStatus);

module.exports = router;
