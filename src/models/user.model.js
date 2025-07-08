const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: String,
    dob: Date,
    address: { required: false, type: String, default: "" },
    phoneNumber: String,
    state: { required: false, type: String, default: "" },
    zipCode: { required: false, type: String, default: "" },
    email: String,
    gender: { required: false, type: String, default: "" },
    userType: String,
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields
module.exports = mongoose.model("User", userSchema);
