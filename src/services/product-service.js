const productRepository = require("../repositories/user-repository");

exports.createProduct = async (email) => {
  const contact = await productRepository.createProduct(email);
  return contact;
};
