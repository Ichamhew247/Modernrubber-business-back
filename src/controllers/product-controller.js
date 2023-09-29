const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const { v4: uuidv4 } = require("uuid");
let products = [
  {
    id: 1,
    nameProduct: "namePro",
    nameProductEtc: "nameEtc",
    price: "123",
    type: "ยาง",
    description: "www",
    image: "image",
  },
  {
    id: 2,
    nameProduct: "Longlong",
    nameProductEtc: "namelongEtc",
    price: "222",
    type: "plastic",
    description: "description",
    image: "image",
  },
  {
    id: 3,
    nameProduct: "tyty",
    nameProductEtc: "wweee",
    price: "9090909",
    type: "Non",
    description: "description",
    image: "image",
  },
];
exports.getProduce = async (req, res, next) => {
  res.send(products);
};
exports.createProduce = async (req, res, next) => {
  const { nameProduct, nameProductEtc, price, type, description, image } =
    req.body;

  const product = {
    // taxValue: req.body.taxValue
    id: uuidv4(),
    nameProduct: nameProduct,
    nameProductEtc: nameProductEtc,
    price: price,
    type: type,
    description: description,
    image: image,
  };

  products.push(product);
  return res.send(product);
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;
  const index = products.findIndex((product) => product.id == id);
  if (index > -1) {
    products.splice(index, 1);
  }

  res.send(products);
};

exports.editProduct = async (req, res, next) => {
  const id = req.params.id;
  const { nameProduct, nameProductEtc, price, type, description, image } =
    req.body;

  const productToEdit = products.find((product) => product.id == id);

  productToEdit.nameProduct = nameProduct;
  productToEdit.nameProductEtc = nameProductEtc;
  productToEdit.description = description;
  productToEdit.type = type;
  productToEdit.price = price;
  productToEdit.image = image;
  res.send(productToEdit);
  // res.json({ message: "Todo updated successfully", product: productToEdit });
};
