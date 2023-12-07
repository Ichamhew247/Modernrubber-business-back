// const { Users } = require("../models");
const { Contact } = require("../models");
const db = require("../models");
const User = db.user;

exports.getUsername = (userName) =>
  User.findOne({
    where: {
      userName: userName,
    },
  });

exports.saveContact = (email) => {
  return Contact.create({
    email: email,
  });
};

exports.createUser = (user) => User.create(user);
exports.saveContact = (email) => Contact.create({ email });
