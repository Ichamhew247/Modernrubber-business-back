// const { CompanyLists } = require("../models");
// const dotenv = require("dotenv");
const path = require("path");
const { Op } = require("sequelize");
// dotenv.config({ path: "./config.env" });

const db = require("../models");
const Companylist = db.companylists;

exports.getProduct = async (req, res, next) => {
  try {
    const companylists = await Companylist.findAll();
    res.json(companylists);
  } catch (error) {
    next(error);
  }
};

exports.searchProduct = (req, res, next) => {
  const searchKeyword = req.query.keyword;
  Companylist.findAll({
    where: {
      [Op.or]: [
        // {
        //   customerCode: {
        //     [Op.like]: `%${searchKeyword}%`,
        //   },
        // },
        {
          companyName: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          address: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          email: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          contactNumber: {
            [Op.like]: `%${searchKeyword}%`,
          },
        },
        {
          note: {
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
    const { companyName, address, email, contactNumber, note } = req.body;
    console.log("Request Body:", req.body);

    const result = await Companylist.create({
      companyName,
      address,
      email,
      contactNumber,
      note,
    });

    res.status(201).json({ message: "อัพโหลดสินค้าสำเร็จ", result });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    let { id } = req.params;

    const result = await Companylist.destroy({
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

    const result = await Companylist.update(
      { ...req.body },
      { where: { id: id } }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
