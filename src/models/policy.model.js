const mongoose = require("mongoose");
const policySchema = new mongoose.Schema({
  policyNumber: { required: true, type: String },
  policyStartDate: { required: true, type: Date },
  policyEndDate: { required: true, type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "PolicyCategory" },
  companyId: { type: mongoose.Schema.Types.ObjectId, ref: "PolicyCarrier" },
  accountId: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
});
module.exports = mongoose.model("Policy", policySchema);
