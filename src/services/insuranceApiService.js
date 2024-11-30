const Policy = require('../models/policyModel');

exports.getPoliciesByCategory = async (category) => {
  return await Policy.find({ category });
};
