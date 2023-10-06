const { Products } = require("../models");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

exports.getProduct = async (req, res, next) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.searchProduct = (req, res, next) => {
  const searchKeyword = req.query.keyword;
  Products.findAll({
    where: {
      [Op.or]: [
        {
          nameProduct: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          nameProductEtc: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          description: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          type: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          price: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
      ],
    },
  })
    .then((results) => {
      res.json(results);
    })
    .catch(next);
};

exports.createProduct = async (req, res, next) => {
  try {
    const { nameProduct, nameProductEtc, price, type, description, image } =
      req.body;

    const result = await Products.create({
      nameProduct: nameProduct,
      nameProductEtc: nameProductEtc,
      description: description,
      type: type,
      price: price,
    });
    res.status(201).json({ message: "อัพโหลดสินค้าสำเร็จ", result });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let { id } = req.params;

    const result = await Products.destroy({
      where: { id: id },
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.editProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Products.update(
      { ...req.body },
      { where: { id: id } }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
