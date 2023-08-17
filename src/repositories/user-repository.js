const { Users } = require("../models");

exports.getUsername = (userName) =>
  Users.findOne({
    where: {
      userName: userName,
    },
  });

exports.createUser = (user) => Users.create(user);
