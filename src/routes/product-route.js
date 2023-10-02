const express = require("express");

const productController = require("../controllers/product-controller");
const uploadController = require("../controllers/upload-controller");
const router = express.Router();

router.get("/getProduct", productController.getProduct);
router.post("/createProduct", productController.createProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.patch("/editProduct/:id", productController.editProduct);
router.post("/searchProduct", productController.searchProduct);
router.post("/imageProduct", uploadController.uploadProductImage);

module.exports = router;
