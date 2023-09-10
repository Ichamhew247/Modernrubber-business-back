const {
  validateRegister,
  validateLogin,
  validateContact,
} = require("../validators/auth-validator");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");

exports.register = async (req, res, next) => {
  try {
    //1.validate
    const value = validateRegister(req.body);
    const isUserExist = await userService.checkUserNameExist(value.userName);
    if (isUserExist) {
      createError("This Username already in use");
    }
    //2.hash password
    value.password = await bcryptService.hash(value.password);
    //3.insert to users table
    const user = await userService.createUser(value);
    //4.sign token and sent
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUsername(value.userName);
    if (!user) {
      createError("invalid credential", 400);
    }
    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );
    if (!isCorrect) {
      createError("invalid credential", 400);
    }
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};
exports.contact = async (req, res, next) => {
  try {
    const value = validateContact(req.body);
    const MeEmail = await userService.saveContact(value.email);
    if (!MeEmail) {
      createError("invalid credential", 400);
    }
  } catch (err) {
    next(err);
  }
};
