const express = require("express");
const router = express.Router();
const agentController = require("../controllers/agent.controller");

// GET All Agents
/**
 * @swagger
 * tags:
 *   name: Agent
 *   description: Agent Management
 */

/**
 * @swagger
 * /agent:
 *   get:
 *     summary: Retrieve a list of all agents
 *     tags: [Agent]
 *     responses:
 *       200:
 *         description: A list of agents.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Agent'
 */
router.get("/", agentController.getAllAgents);

module.exports = router;
