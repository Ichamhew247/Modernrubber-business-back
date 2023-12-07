module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "contact",
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
