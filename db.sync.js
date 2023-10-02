const { Mew, Products } = require("./src/models");
const { sequelize } = require("./src/models");
sequelize
  .sync({ force: true })
  .then(() => {
    return Products.bulkCreate([
      {
        nameProduct: "lorem1",
        nameProductEtc: "lorem lorem1",
        description: "lorem lorem  lorem lorem lorem lorem1 ",
        price: "1200",
        type: "lorem1",
        image: "lorem1",
      },
      {
        nameProduct: "lorem2",
        nameProductEtc: "lorem lorem2",
        description: "lorem lorem  lorem lorem lorem lorem2 ",
        price: "1200",
        type: "lorem2",
        image: "lorem2",
      },
      {
        nameProduct: "lorem3",
        nameProductEtc: "lorem lorem3",
        description: "lorem lorem  lorem lorem lorem lorem3",
        price: "1200",
        type: "lorem3",
        image: "lorem3",
      },
    ]);
  })

  .then(() => process.exit(0))
  .catch((err) => console.log(err.message));
