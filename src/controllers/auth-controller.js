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
exports.login = async (req, res, next) => {
  try {
    const value = validateLogin(req.body);
    const user = await userService.getUsername(value.userName);

    // Check if the user exists
    if (!user) {
      createError("Invalid credentials", 400);
    }

    // Check if the user is an admin based on credentials
    const isAdminCredentials =
      value.userName === process.env.ADMIN_USERNAME &&
      value.password === process.env.ADMIN_PASSWORD;

    // Check if the user is an admin based on role
    const isAdmin = user.role === "admin";

    // Check for admin credentials and set the session
    if (isAdminCredentials || isAdmin) {
      req.session.username = value.userName;
      req.session.role = "admin";
    } else {
      // If not an admin, proceed with normal user login
      const isCorrect = await bcryptService.compare(
        value.password,
        user.password
      );

      if (!isCorrect) {
        createError("Invalid credentials", 400);
      }

      req.session.role = "user";
    }

    const accessToken = tokenService.sign({ id: user.id });
    res.status(200).json({ accessToken, role: req.session.role });
  } catch (err) {
    next(err);
  }
};

// exports.login = async (req, res, next) => {
//   try {
//     const value = validateLogin(req.body);
//     const user = await userService.getUsername(value.userName);
//     if (!user) {
//       createError("invalid credential", 400);
//     }
//     const isCorrect = await bcryptService.compare(
//       value.password,
//       user.password
//     );
//     if (!isCorrect) {
//       createError("invalid credential", 400);
//     }
//     const accessToken = tokenService.sign({ id: user.id });
//     res.status(200).json({ accessToken });
//   } catch (err) {
//     next(err);
//   }
// };
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
