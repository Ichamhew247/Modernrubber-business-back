const Joi = require("joi");

const validate = require("./validate");

const productSchema = Joi.object({
  nameProduct: Joi.string().required(),
  nameProductEtc: Joi.string().required(),
  price: Joi.string().required(),
  type: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
});

exports.validateProductSchema = validate(productSchema);
