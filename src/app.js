require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
// const mysql = require("mysql");
const path = require("node:path");
const { Products } = require("../src/models");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const cloudinary = require("./cloudinary/cloudinary");

const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");
const productRoute = require("./routes/product-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const app = express();

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

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(helmet());
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "too many requests" },
  })
);
app.use(express.json());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/auth", authRoute);
app.use("/todos", todoRoute);
app.use("/products", productRoute);
///////////////
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  Products.create({
    productImage: image,
  })
    .then((result) => {
      res.status(201).json({ message: "Success", sql: result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error" });
    });
});

// app.get("/", (req, res) => {
//   const sql = "select * Products";
//   db.query(sql, (err, result) => {
//     if (err) return res.json("Error");
//     return res.json(result);
//   });
// });
app.get("/", async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port || 8000, () => {
  console.log("server running on port " + port);
});
