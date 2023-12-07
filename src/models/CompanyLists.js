module.exports = (sequelize, DataTypes) => {
  const Companylist = sequelize.define(
    "companylist",
    {
      companyName: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      contactNumber: {
        type: DataTypes.STRING,
      },
      note: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  return Companylist;
};
