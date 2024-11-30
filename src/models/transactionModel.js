const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: {
    type: Number,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Policy",
    required: true,
  },
  status: {
    type: String,
    enum: ["PENDING", "COMPLETED", "FAILED"],
    default: "PENDING",
  },
  mpesaTransactionId: {
    type: String,
    default: "",
  },
  }, { timestamps: true });


module.exports = mongoose.model('Transaction', transactionSchema);

