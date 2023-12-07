const Joi = require("joi");

const validate = require("./validate");

const registerSchema = Joi.object({
  fullName: Joi.string().trim().required(),
  userName: Joi.string().trim().required(),
  password: Joi.string()
    .pattern(/^[a-zA-z0-9]{6,30}$/)
    .trim()
    .required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .strip(),
});

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

const contactSchema = Joi.object({
  email: Joi.string().required(),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
exports.validateContact = validate(contactSchema);
