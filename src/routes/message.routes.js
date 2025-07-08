const express = require("express");
const router = express.Router();
const messageController = require("../controllers/message.controller");

/**
 * @swagger
 * tags:
 *   - name: Message Schedule
 *     description: API for scheduling messages
 */

/**
 * @swagger
 * /message/schedule:
 *   post:
 *     tags:
 *       - Message Schedule
 *     summary: Schedule a message
 *     description: Schedule a message to be sent at a specific date and time.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *               - day
 *               - time
 *             properties:
 *               message:
 *                 type: string
 *                 description: The message content
 *                 example: "Hello World!"
 *               day:
 *                 type: string
 *                 description: Scheduled date in YYYY-MM-DD format
 *                 example: "2025-07-09"
 *               time:
 *                 type: string
 *                 description: Scheduled time in HH:mm:ss format
 *                 example: "14:30:00"
 *     responses:
 *       200:
 *         description: Message scheduled successfully
 *       400:
 *         description: Missing parameters
 *       500:
 *         description: Failed to schedule message
 */
router.post("/schedule", messageController.scheduleMessage);

module.exports = router;
