const express = require("express");
const productController = require("../controllers/product-controller");
const router = express.Router();

router.get("/getProduct", productController.getProduct);
router.post("/createproduct", productController.createProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.patch("/editProduct/:id", productController.editProduct);
router.post("/searchProduct", productController.searchProduct);

module.exports = router;
