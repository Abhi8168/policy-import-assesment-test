const Joi = require("joi");

const csvImportSchema = Joi.object({
  agent: Joi.string().required(),
  userType: Joi.string().required(),
  policy_mode: Joi.string().required(),
  producer: Joi.string().required(),
  policy_number: Joi.string().required(),
  premium_amount_written: Joi.string().allow(""),
  premium_amount: Joi.string().required(),
  policy_type: Joi.string().required(),
  company_name: Joi.string().required(),
  category_name: Joi.string().required(),
  policy_start_date: Joi.date().required(),
  policy_end_date: Joi.date().required(),
  csr: Joi.string().required(),
  account_name: Joi.string().required(),
  email: Joi.string().email().required(),
  gender: Joi.string().allow(""),
  firstname: Joi.string().required(),
  city: Joi.string().allow(""),
  account_type: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string().allow(""),
  state: Joi.string().allow(""),
  zip: Joi.string().allow(""),
  dob: Joi.date().required(),
}).options({ allowUnknown: true });

module.exports = csvImportSchema;
