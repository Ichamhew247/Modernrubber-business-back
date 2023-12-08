module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define(
    "profile",
    {
      imageName: {
        type: DataTypes.STRING,
      },
      imagePrice: {
        type: DataTypes.STRING,
      },
      imageDetail: {
        type: DataTypes.STRING,
      },
      imageCategory: {
        type: DataTypes.STRING,
      },
      imageProduct: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return Profile;
};
