//Manages user transactions and their statuses.
const Transaction = require('../models/transactionModel');



exports.createTransaction = async (req, res) => {
  try {
    const { amount, phone, policyId } = req.body;
    const newTransaction = new Transaction({ amount, phone, policyId });
    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Error creating transaction", error });
  }
};
exports.getUserTransactions = async (req, res) => {
  const { userId } = req.params;
  try {
    const transactions = await Transaction.find({ userId }).populate('policyId');
    res.status(200).json({ success: true, data: transactions });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching transactions', error });
  }
};

exports.updateTransactionStatus = async (req, res) => {
  const { transactionId } = req.params;
  const { status, mpesaTransactionId } = req.body;
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      transactionId,
      { status, mpesaTransactionId },
      { new: true }
    );
    res.status(200).json({ success: true, data: transaction });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating transaction', error });
  }
};
