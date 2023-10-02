const { Products } = require("../models");

exports.createProduct = (nameProduct) => {
  return Products.create({ nameProduct });
};

exports.createContact = (nameProduct) => Products.create(nameProduct);
