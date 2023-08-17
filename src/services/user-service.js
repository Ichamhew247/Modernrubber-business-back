const userRepository = require("../repositories/user-repository");

exports.checkUserNameExist = async (userName) => {
  const existUser = await userRepository.getUsername(userName);
  return !!existUser;
};

exports.createUser = (user) => userRepository.createUser(user);

//controller repository service
