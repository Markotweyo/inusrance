const insuranceService = require('../services/insuranceApiService');
const chatbotResponseService = require('../services/chatbotResponseService');
const paymentService = require('../services/mpesaService');
const User = require('../models/userModel');

exports.handleMessage = async (req, res) => {
  const { Body, From } = req.body;

  if (Body.toLowerCase() === 'hi') {
    return res.json({ message: 'Welcome! Choose a category:\n1. Health\n2. Auto\n3. Life' });
  }

  if (Body === '1') {
    const policies = await insuranceService.getPoliciesByCategory('Health');
    return res.json({ message: chatbotResponseService.getPolicyOptionsResponse(policies) });
  }

  if (Body.startsWith('buy')) {
    const [_, policyId] = Body.split(' ');
    const amount = 1500; // Replace with dynamic pricing
    const paymentRef = await paymentService.initiatePayment(amount, From, policyId);
    return res.json({ message: `Payment initiated. Use M-Pesa to complete the payment: Ref: ${paymentRef}` });
  }

  res.json({ message: 'Invalid input. Reply "Hi" to start again.' });
};
