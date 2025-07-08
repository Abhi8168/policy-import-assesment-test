const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Policy Management
 */

/**
 * @swagger
 * /user/policies:
 *   get:
 *     summary: Aggregate policies grouped by each user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: List of users with their aggregated policy information
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 example:
 *                   userId: 60f7e8a2a7b1a2c9b0e7a5a2
 *                   policiesCount: 5
 */

/**
 * @swagger
 * /user/search/{username}:
 *   get:
 *     summary: Search policies by username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *         description: The username to search policies for
 *     responses:
 *       200:
 *         description: Policies matching the given username
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No policies found for the specified username
 */
router.get("/policies", userController.aggregatePoliciesByUser);
router.get("/search/:username", userController.searchPolicyByUser);

module.exports = router;
