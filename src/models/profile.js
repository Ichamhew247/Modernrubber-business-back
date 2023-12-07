module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "profile",
    {
      imageProduct: {
        type: DataTypes.STRING,
      },
      imageName: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return Profile;
};
