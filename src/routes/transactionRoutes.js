const express = require('express');
const { createTransaction, getUserTransactions, updateTransactionStatus } = require('../controllers/transactionController');

const router = express.Router();

router.post("/", createTransaction);
router.get('/:userId', getUserTransactions);
router.patch("/:transactionId/status", updateTransactionStatus); 

module.exports = router;