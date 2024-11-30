const MpesaService = require("../services/mpesaService");
const TransactionService = require("../services/transactionService");

exports.initiatePayment = async (req, res) => {
  
    const { phone, amount } = req.body;
    try {
    // Call M-Pesa service to initiate payment
    const mpesaResponse = await MpesaService.initiateSTKPush(phone, amount);

    // Update the transaction with the M-Pesa transaction ID
    //TransactionService.updateTransactionStatus(transactionId, "PENDING", mpesaResponse.CheckoutRequestID);
    res.status(200).json({
      message: "Payment initiated successfully",
      data: mpesaResponse,
    });
  } catch (error) {
    console.error("Error initiating payment:", error.message);
    res.status(500).json({ 
      message: "Error initiating payment", 
      error: error.message });
  }
};


/**
 * Handle M-Pesa Callback
 */
exports.handleCallback = async (req, res) => {
  try {
    const response = await MpesaService.handleCallback(req.body);
    res.status(200).json({
      message: "Callback processed successfully",
      data: response,
    });
  } catch (error) {
    res.status(500).json({ message: "Error handling M-Pesa callback", error: error.message });
  }
};



