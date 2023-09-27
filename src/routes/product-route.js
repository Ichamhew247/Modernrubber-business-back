const express = require("express");

const productController = require("../controllers/product-controller");

const router = express.Router();

router.get("/getProduct", productController.getProduce);
router.post("/createProduct", productController.createProduce);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.patch("/editProduct/:id", productController.editProduct);

module.exports = router;
