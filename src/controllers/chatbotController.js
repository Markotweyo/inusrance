const PolicyService = require("../services/policyService");
const TwilioService = require("../services/twilioService");

/**
 * Handle incoming messages
 */
const handleUserMessage = async (req, res) => {
  const { From, Body } = req.body; // From: user's WhatsApp number, Body: user's message

  try {
    if (Body.toLowerCase().includes("compare")) {
      const policyType = Body.split(" ")[1]; // e.g., "Compare health"
      const policies = await PolicyService.comparePolicies(policyType);

      if (policies.length === 0) {
        await TwilioService.sendWhatsAppMessage(From, `No policies found for type: ${policyType}.`);
      } else {
        const policyDetails = policies
          .map(
            (policy, index) =>
              `${index + 1}. Provider: ${policy.provider}, Premium: ${policy.premium}, Coverage: ${policy.coverage}`
          )
          .join("\n");

        await TwilioService.sendWhatsAppMessage(
          From,
          `Here are the best ${policyType} policies:\n\n${policyDetails}`
        );
      }
    } else {
      await TwilioService.sendWhatsAppMessage(
        From,
        "Welcome to our Insurance Assistant! Type 'Compare <policy-type>' to see available policies."
      );
    }

    res.status(200).send("Message processed.");
  } catch (error) {
    console.error("Error handling user message:", error.message);
    res.status(500).send("Error processing message.");
  }
};

module.exports = {
  handleUserMessage,
};
