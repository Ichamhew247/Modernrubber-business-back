const { Contact } = require("../models");

exports.getUsername = (email) =>
  Users.findOne({
    where: {
      email: email,
    },
  });

exports.createContact = (contact) => Contact.create(contact);
