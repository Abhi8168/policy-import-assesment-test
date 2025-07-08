const { parentPort, workerData } = require("worker_threads");
const fs = require("fs");
const csv = require("csv-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./src/config/db");
const Agent = require("./src/models/agent.model");
const User = require("./src/models/user.model");
const Account = require("./src/models/account.model");
const PolicyCategory = require("./src/models/policyCategory.model");
const PolicyCarrier = require("./src/models/policyCompany.model");
const Policy = require("./src/models/policy.model");
const csvImportSchema = require("./src/validators/csv-import.validator");

(async () => {
  try {
    await connectDB();

    const results = [];
    fs.createReadStream(workerData.filePath)
      .pipe(csv())
      .on("data", (data) => results.push(data))
      .on("end", async () => {
        //? Caching maps
        // ? ✅ Use cache to avoid duplicate DB calls
        const cache = {
          agents: new Map(),
          accounts: new Map(),
          categories: new Map(),
          carriers: new Map(),
          users: new Map(),
        };

        for (const [index, row] of results.entries()) {
          // ✅ Validate before processing
          const { error, value } = csvImportSchema.validate(row);
          if (error) {
            throw new Error(
              `Validation error at row ${index + 1}: ${error.message}`
            );
          }

          //? Create or update Agents
          let agent = cache.agents.get(value.agent);
          if (!agent) {
            agent = await Agent.findOneAndUpdate(
              { name: value.agent },
              { name: value.agent },
              { upsert: true, new: true }
            );
            cache.agents.set(value.agent, agent);
          }

          //? Create or update Accounts
          let account = cache.accounts.get(value.account_name);
          if (!account) {
            account = await Account.findOneAndUpdate(
              { accountName: value.account_name },
              { accountName: value.account_name },
              { upsert: true, new: true }
            );
            cache.accounts.set(value.account_name, account);
          }

          //? Create or update PolicyCategory
          let category = cache.categories.get(value.category_name);
          if (!category) {
            category = await PolicyCategory.findOneAndUpdate(
              { categoryName: value.category_name },
              { categoryName: value.category_name },
              { upsert: true, new: true }
            );
            cache.categories.set(value.category_name, category);
          }
          //? Create or update PolicyCarrier
          let carrier = cache.carriers.get(value.company_name);
          if (!carrier) {
            carrier = await PolicyCarrier.findOneAndUpdate(
              { companyName: value.company_name },
              { companyName: value.company_name },
              { upsert: true, new: true }
            );
            cache.carriers.set(value.company_name, carrier);
          }

          let user = cache.users.get(value.email);
          if (!user) {
            user = await User.findOneAndUpdate(
              { email: value.email },
              {
                firstName: value.firstname,
                dob: value.dob,
                address: value.address,
                phoneNumber: value.phone,
                state: value.state,
                zipCode: value.zip,
                email: value.email,
                gender: value.gender,
                userType: value.userType,
              },
              { upsert: true, new: true }
            );
            cache.users.set(value.email, user);
          }

          await Policy.findOneAndUpdate(
            {
              policyNumber: value.policy_number,
            },
            {
              policyNumber: value.policy_number,
              policyStartDate: value.policy_start_date,
              policyEndDate: value.policy_end_date,
              userId: user._id,
              agentId: agent._id,
              accountId: account._id,
              categoryId: category._id,
              companyId: carrier._id,
            },
            {
              upsert: true,
              new: true,
            }
          );
        }

        parentPort.postMessage({
          message: "Import Complete",
          count: results.length,
        });
      });
  } catch (error) {
    console.error("Worker Error:", error);
    parentPort.postMessage({ success: false, error: error.message });
  }
})();
