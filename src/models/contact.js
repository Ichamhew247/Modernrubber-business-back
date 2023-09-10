module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define(
    "Contact",
    {
      email: {
        type: DataTypes.STRING,
        unique: true,
        // validate: {
        //   isEmail: true,
        // },
      },

      // mobile: {
      //   type: DataTypes.STRING,
      //   allowNull: true,
      //   validate: {
      //     is: /^[0-9]{10}$/,
      //   },
      // },
    },
    {
      underscored: true,
    }
  );

  return Contact;
};
