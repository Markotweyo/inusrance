const express = require('express');
const { handleMessage } = require('../controllers/whatsappController');

const router = express.Router();

router.post('/webhook', handleMessage);

module.exports = router;
