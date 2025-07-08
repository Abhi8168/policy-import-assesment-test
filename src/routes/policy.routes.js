const express = require("express");
const router = express.Router();
const policyController = require("../controllers/policy.controller");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

/**
 * @swagger
 * tags:
 *   name: Policy
 *   description: Policy Data Import
 */

// Ensure uploads folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
// Multer config for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });
/**
 * @swagger
 * /policy/import:
 *   post:
 *     summary: Import Policy Data from XLSX/CSV file
 *     tags: [Policy]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: The CSV or XLSX file containing policy data
 *     responses:
 *       200:
 *         description: File processed successfully and data imported
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "File processed successfully"
 *       400:
 *         description: Invalid file or processing error
 */
// Import Policy Data via Worker Thread
router.post("/import", upload.single("file"), policyController.importPolicies);

module.exports = router;
