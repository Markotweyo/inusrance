//Handles environment variables and constants
require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3000,
  DB_URI: process.env.DB_URI,
  MPESA: {
    CONSUMER_KEY: process.env.MPESA_CONSUMER_KEY,
    CONSUMER_SECRET: process.env.MPESA_CONSUMER_SECRET,
    BASE_URL: 'https://sandbox.safaricom.co.ke',
    SHORTCODE:process.env.MPESA_SHORTCODE,
    PASSKEY: process.env.MPESA_PASSKEY,
  },
  WHATSAPP: {
    WHATSAPP_NUMBER: process.env.TWILIO_WHATSAPP_NUMBER, // Replace with Twilio number
    ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
  }
  
};
