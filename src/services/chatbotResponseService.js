const { formatPolicies } = require('../utils/helpers');

exports.getPolicyOptionsResponse = (policies) => {
  const formatted = formatPolicies(policies);
  return `Here are your options:\n${formatted}\n\nReply with the policy number to proceed.`;
};
