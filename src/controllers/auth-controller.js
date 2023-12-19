const {
  validateRegister,
  validateLogin,
  validateContact,
} = require("../validators/auth-validator");
const userService = require("../services/user-service");
const createError = require("../utils/create-error");
const bcryptService = require("../services/bcrypt-service");
const tokenService = require("../services/token-service");

const db = require("../models");
const User = db.user;

exports.findLoggedInUser = async (req, res, next) => {
  const userRole = req.session.role;
  const userName = req.session.username;
  try {
    const loggedInUser = await User.findOne({
      where: { role: userRole, userName: userName },
    });
    res.json(loggedInUser);
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUsername(value.userName);

    const isCorrect = await bcryptService.compare(
      value.password,
      user.password
    );

    if (!isCorrect) {
      createError("Invalid passsword match", 400)(req, res);
      return;
    }

    // Assuming the user information includes the role
    req.session.username = value.userName;
    myName = value.userName;
    req.session.role = user.role;
    myRole = user.role;
    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken, role: myRole, name: myName });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const value = validateRegister(req.body);
    const isUserExist = await userService.checkUserNameExist(value.userName);
    if (isUserExist) {
      createError("This Username already in use");
    }
    value.password = await bcryptService.hash(value.password);
    const user = await userService.createUser(value);
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
      throw new Error("Invalid credentials");
    }

    res.status(201).json({ message: "send email completed", result: MeEmail });
  } catch (err) {
    next(err);
  }
};
