const { CompanyLists } = require("../models");
const dotenv = require("dotenv");
const path = require("path");
const { Op } = require("sequelize");
dotenv.config({ path: "./config.env" });

exports.getProduct = async (req, res, next) => {
  try {
    const companyLists = await CompanyLists.findAll();
    res.json(companyLists);
  } catch (error) {
    next(error);
  }
};

exports.searchProduct = (req, res, next) => {
  const searchKeyword = req.query.keyword;
  CompanyLists.findAll({
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

    const result = await CompanyLists.create({
      // customerCode,
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

    const result = await CompanyLists.destroy({
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

    const result = await CompanyLists.update(
      { ...req.body },
      { where: { id: id } }
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
