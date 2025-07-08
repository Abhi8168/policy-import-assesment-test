const Agent = require("../models/agent.model");

// @desc    Get All Agents
// @route   GET /api/agent
// @access  Public
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();
    res.status(200).json(agents);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch agents", details: err.message });
  }
};
