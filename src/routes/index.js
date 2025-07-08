const express = require("express");
const router = express.Router();

router.use("/user", require("./user.routes"));
router.use("/agent", require("./agent.routes"));
router.use("/policy", require("./policy.routes"));
router.use("/message", require("./message.routes"));
module.exports = router;
