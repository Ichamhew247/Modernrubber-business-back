module.exports = (sequelize, DataTypes) => {
  const CompanyLists = sequelize.define(
    "CompanyLists",
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

  return CompanyLists;
};
