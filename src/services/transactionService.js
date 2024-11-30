const Transaction = require("../models/transactionModel");

/**
 * Create a new transaction in the database.
 * @param {Object} transactionData - Data for creating the transaction.
 * @returns {Object} - The saved transaction.
 */
exports.createTransaction = async (transactionData) => {
  try {
    const newTransaction = new Transaction(transactionData);
    return await newTransaction.save();
  } catch (error) {
    throw new Error("Error creating transaction: " + error.message);
  }
};

/**
 * Fetch a transaction by its ID.
 * @param {String} transactionId - The ID of the transaction to fetch.
 * @returns {Object} - The transaction object if found.
 */
exports.getTransactionById = async (transactionId) => {
  try {
    return await Transaction.findById(transactionId);
  } catch (error) {
    throw new Error("Error fetching transaction: " + error.message);
  }
};

/**
 * Update the status of a transaction by its ID.
 * @param {String} transactionId - The ID of the transaction to update.
 * @param {String} status - The new status of the transaction.
 * @param {String} [mpesaTransactionId] - Optional M-Pesa transaction ID to associate with the transaction.
 * @returns {Object} - The updated transaction.
 */
exports.updateTransactionStatus = async (transactionId, status, mpesaTransactionId) => {
  try {
    const updateData = { status };
    if (mpesaTransactionId) {
      updateData.mpesaTransactionId = mpesaTransactionId;
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(transactionId, updateData, { new: true });

    if (!updatedTransaction) {
      throw new Error("Transaction not found");
    }

    return updatedTransaction;
  } catch (error) {
    throw new Error("Error updating transaction: " + error.message);
  }
};

/**
 * Update a transaction status using the M-Pesa transaction ID.
 * @param {String} mpesaTransactionId - The M-Pesa transaction ID.
 * @param {String} status - The new status of the transaction.
 * @returns {Object} - The updated transaction.
 */
exports.updateTransactionStatusByMpesaId = async (mpesaTransactionId, status) => {
  try {
    const updatedTransaction = await Transaction.findOneAndUpdate(
      { mpesaTransactionId },
      { status },
      { new: true }
    );

    if (!updatedTransaction) {
      throw new Error("Transaction with M-Pesa ID not found");
    }

    return updatedTransaction;
  } catch (error) {
    throw new Error("Error updating transaction by M-Pesa ID: " + error.message);
  }
};

;
