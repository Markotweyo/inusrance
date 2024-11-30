//Handle interactions with Twilio's API

const twilio = require("twilio");

const { WHATSAPP } = require("../utils/config")

const client = twilio(WHATSAPP.ACCOUNT_SID, WHATSAPP.AUTH_TOKEN);

/**
 * Send a WhatsApp message
 */
const sendWhatsAppMessage = async (to, message) => {
  try {
    await client.messages.create({
        from: `whatsapp:${WHATSAPP.WHATSAPP_NUMBER}`,
        to: `whatsapp:${to}`,
        body: message,
    });
  } catch (error) {
    throw new Error("Failed to send WhatsApp message: " + error.message);
  }
};

module.exports = {
  sendWhatsAppMessage,
};
