//Defines the callback route for M-Pesa events.
const express = require('express');
const { handleMpesaCallback } = require('../controllers/callbackController');

const router = express.Router();

router.post('/mpesa', handleMpesaCallback);

module.exports = router;
