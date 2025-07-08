const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");
const { checkCpuAndRestart } = require("./utils/cpu-monitor");
const cors = require("cors");
require("dotenv").config();
require("./services/scheduler.service");

const connectDB = require("./config/db");

const app = express();
app.use(cors("*")); // ✅ Allow CORS globally
app.use(express.json());

connectDB();

app.use("/api", require("./routes"));
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Check every minute
setInterval(checkCpuAndRestart, 60 * 1000); // 60 seconds

const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📚 Swagger Docs available at http://localhost:${PORT}/api-docs`);
});
