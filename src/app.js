require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const multer = require("multer");
const path = require("node:path");
const { Profile } = require("../src/models");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoute = require("./routes/auth-route");
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
app.use("/products", productRoute);

//Start Upload Image
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const imageName = req.body.imageName;
  Profile.create({
    imageProduct: image,
    imageName: imageName,
  })
    .then((result) => {
      res.status(201).json({ message: "Success", sql: result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "Error" });
    });
});

app.get("/images", async (req, res) => {
  try {
    const image = await Profile.findAll();
    console.log("Image data:", image);
    res.json(image);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//End Upload Image
app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port || 8000, () => {
  console.log("server running on port " + port);
});
