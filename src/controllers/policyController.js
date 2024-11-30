const Policy = require('../models/policyModel');

exports.getAllPolicies = async (req, res) => {
  try {
    const policies = await Policy.find();
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching policies', error });
  }
};

exports.getPoliciesByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const policies = await Policy.find({ category });
    res.status(200).json({ success: true, data: policies });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching policies', error });
  }
};

exports.createPolicy = async (req, res) => {
  const { name, category, price, provider,description } = req.body;
  try {
    const policy = await Policy.create({ name, category, price, provider, description });
    res.status(201).json({ success: true, data: policy });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating policy', error });
  }
};
