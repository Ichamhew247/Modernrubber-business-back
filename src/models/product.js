module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define(
    "Products",
    {
      nameProduct: {
        type: DataTypes.STRING,
      },
      nameProductEtc: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      type: {
        type: DataTypes.STRING,
      },
      price: {
        type: DataTypes.STRING,
      },
      image: {
        type: DataTypes.STRING,
      },
      productImage: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  return Products;
};
