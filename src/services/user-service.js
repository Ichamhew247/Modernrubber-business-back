const userRepository = require("../repositories/user-repository");

exports.checkUserNameExist = async (userName) => {
  const existUser = await userRepository.getUsername(userName);
  return !!existUser;
};

exports.createUser = (user) => userRepository.createUser(user);

exports.getUsername = async (userName) => {
  const user = await userRepository.getUsername(userName);
  return user;
};

exports.checkContactExist = async (email) => {
  const existContact = await userRepository.getContact(email);
  return !!existContact;
};

exports.saveContact = async (email) => {
  const contact = await userRepository.saveContact(email);
  return contact;
};
