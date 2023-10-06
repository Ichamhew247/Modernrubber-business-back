const express = require("express");
const productController = require("../controllers/product-controller");
const multer = require("multer");
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
router.get("/getProduct", productController.getProduct);
router.post(
  "/createProduct",
  upload.single("image"),
  productController.createProduct
);
router.delete("/deleteProduct/:id", productController.deleteProduct);
router.patch("/editProduct/:id", productController.editProduct);
router.post("/searchProduct", productController.searchProduct);

module.exports = router;
