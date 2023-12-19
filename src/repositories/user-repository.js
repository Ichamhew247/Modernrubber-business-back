const db = require("../models");
const User = db.user;
const Contact = db.contacts;

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
