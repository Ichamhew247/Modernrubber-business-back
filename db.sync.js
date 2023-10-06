const { Products } = require("./src/models");
const { sequelize } = require("./src/models");
sequelize
  .sync({ force: true })
  .then(() => {
    return Products.bulkCreate([]);
  })

  .then(() => process.exit(0))
  .catch((err) => console.log(err.message));
