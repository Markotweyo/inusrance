//Define the webhook for WhatsApp messages
const express = require("express");
const router = express.Router();
const ChatbotController = require("../controllers/chatbotController");

// WhatsApp Webhook
router.post("/webhook", ChatbotController.handleUserMessage);

module.exports = router;
