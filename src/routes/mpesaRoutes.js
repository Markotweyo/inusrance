const express = require("express");
const router = express.Router();
const mpesaController = require("../controllers/mpesaController");

// Route to initiate M-Pesa payment
router.post("/initiate", mpesaController.initiatePayment);

// Route to handle M-Pesa payment callback
router.post("/callback", mpesaController.handleCallback);

module.exports = router;
