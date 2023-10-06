module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      underscored: true,
    }
  );

  return Contact;
};
