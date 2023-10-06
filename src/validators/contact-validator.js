const Joi = require("joi");

const validate = require("./validate");

const contactSchema = Joi.object({
  email: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().email({ tlds: false }),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
  mobile: Joi.forbidden().when("emailOrMobile", {
    is: Joi.string().pattern(/^[0-9]{10}$/),
    then: Joi.string().default(Joi.ref("emailOrMobile")),
  }),
});

const loginSchema = Joi.object({
  userName: Joi.string().required(),
  password: Joi.string().required(),
});

exports.validateRegister = validate(registerSchema);
exports.validateLogin = validate(loginSchema);
