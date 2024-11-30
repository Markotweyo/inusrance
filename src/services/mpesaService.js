const axios = require('axios');
const { MPESA } = require('../utils/config');
//const { token } = require('morgan');

/**
 * Get OAuth Token from M-Pesa API
 */

const generateToken = async () => {
  const credentials = Buffer.from(`${MPESA.CONSUMER_KEY}:${MPESA.CONSUMER_SECRET}`).toString('base64');
  //const credentials = 'Q2RtTmJkdDBpQk4xb3FEZkthc200ZGFiZHBLbXRhTm46RExLRzdQQnVuNzIwR1ppbQ==';
  const response = await axios.get(`${MPESA.BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${credentials}` },
  });
  return response.data.access_token;
};
/**
 * Initiate M-Pesa STK Push
 */
const initiateSTKPush = async (phone, amount) => {
    const token = await generateToken();
    /*const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3); */
     /*const password = Buffer.from('LipaNaMpesa').toString("base64"); */
     console.log(token)
    const payload = {
      BusinessShortCode: '174379',
      Password: 'MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMTYwMjE2MTY1NjI3',
      Timestamp: '20160216165627',
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: phone,
      PartyB: '174379',
      PhoneNumber: phone,
      CallBackURL: 'https://mydomain.com/pat',
      AccountReference: "Test",
      TransactionDesc: 'Insurance policy payment',
    };
   
    try {
      const response = await axios.post(`${MPESA.BASE_URL}/mpesa/stkpush/v1/processrequest`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed to initiate STK Push: " + error.message);
    }
    
    
};



/**
 * Handle M-Pesa Callback Response
 */
const handleCallback = async (callbackData) => {
  const { Body } = callbackData;
  const { stkCallback } = Body;
  const { CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

  const status = ResultCode === 0 ? "COMPLETED" : "FAILED";

  // This function should call the transaction service to update the transaction status
  // Ensure this is implemented in the respective service
  await TransactionService.updateTransactionStatusByMpesaId(CheckoutRequestID, status);

  return { CheckoutRequestID, ResultCode, ResultDesc };
};

module.exports = { initiateSTKPush, handleCallback, };