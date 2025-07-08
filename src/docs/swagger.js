const swaggerJSDoc = require("swagger-jsdoc");
require("dotenv").config();

const port = process.env.SERVER_PORT || 3000;
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Policy Data Import & CPU Monitoring API",
      version: "1.0.0",
      description:
        "API documentation for Policy Data Import, Policy Management, and CPU Usage Monitoring Services",
    },
    servers: [
      {
        url: `http://localhost:${port}/api`, // Base URL for the API
        description: "Local server",
      },
    ],
    components: {},
    // security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.js"], // Swagger reads from these routes
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
