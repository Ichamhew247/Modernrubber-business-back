const express = require("express");

const authController = require("../controllers/auth-controller");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
// router.get("/getloggedinuser", authController.findLoggedInUser);
router.put("/contact", authController.contact);

module.exports = router;
