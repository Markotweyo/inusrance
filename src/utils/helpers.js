//Contains reusable utility functions.
exports.formatPolicies = (policies) =>
    policies
      .map((policy, index) => `${index + 1}. ${policy.name} - ${policy.price} KSH`)
      .join('\n');
  