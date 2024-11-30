//Handles M-Pesa callback events for payment verification.

const Transaction = require('../models/transactionModel');

exports.handleMpesaCallback = async (req, res) => {
  const { Body } = req.body;
  const callbackData = Body.stkCallback;

  if (callbackData && callbackData.ResultCode === 0) {
    const transaction = await Transaction.findOneAndUpdate(
      { mpesaReference: callbackData.CheckoutRequestID },
      { status: 'Completed' },
      { new: true }
    );

    if (transaction) {
      console.log('Payment Successful:', transaction);
    } else {
      console.log('Transaction not found');
    }
  } else {
    console.log('Payment Failed:', callbackData);
  }

  res.status(200).json({ success: true, message: 'Callback received successfully' });
};

