const Policy = require("../models/policyModel");

/**
 * Fetch policies by type
 */
const getPoliciesByType = async (type) => {
  try {
    const policies = await Policy.find({ policyType: type });
    return policies;
  } catch (error) {
    throw new Error("Failed to fetch policies: " + error.message);
  }
};

/**
 * Compare policies by premium
 */
const comparePolicies = async (type) => {
  const policies = await getPoliciesByType(type);

  return policies.sort((a, b) => a.premium - b.premium); // Sort by premium (ascending)
};

module.exports = {
  getPoliciesByType,
  comparePolicies,
};
