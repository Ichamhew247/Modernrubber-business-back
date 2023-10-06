const { Users } = require("../models");
const { Contact } = require("../models");

exports.getUsername = (userName) =>
  Users.findOne({
    where: {
      userName: userName,
    },
  });

exports.saveContact = (email) => {
  return Contact.create({
    email: email,
  });
};

exports.createUser = (user) => Users.create(user);
exports.saveContact = (email) => Contact.create({ email });
