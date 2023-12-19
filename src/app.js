require("dotenv").config();
const express = require("express");
const session = require("express-session");
const { checkAdmin } = require("./middlewares/checkAdmin");
const cors = require("cors");
const morgan = require("morgan");
const path = require("node:path");
const db = require("./models");
const Profile = db.profiles;
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const fs = require("fs");
const https = require("https");

const multer = require("multer");

const authRoute = require("./routes/auth-route");
const productRoute = require("./routes/product-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");
const bodyParser = require("body-parser");
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

const upload = multer({ storage: storage });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "development") {
  console.log("Running in development mode");
}

app.use(morgan("dev"));
app.use(
  session({
    secret: process.env.YOUR_SECRETKEY,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(
  rateLimit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: { message: "too many requests" },
  })
);
app.use(helmet());
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(express.static("public"));
app.use(express.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/auth", authRoute);
// app.use("/products", productRoute);
app.use("/products", checkAdmin, productRoute);

//Start Upload Image
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.filename;
  const imageName = req.body.imageName;
  const imagePrice = req.body.imagePrice;
  const imageDetail = req.body.imageDetail;
  const imageCategory = req.body.imageCategory;

  Profile.create({
    imageProduct: image,
    imageName: imageName,
    imagePrice: imagePrice,
    imageDetail: imageDetail,
    imageCategory: imageCategory,
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

app.delete("/deleteImage/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const imageToDelete = await Profile.findOne({ where: { id: id } });

    if (!imageToDelete) {
      return res.status(404).json({ message: "Image not found" });
    }

    // ลบไฟล์ภาพ
    const imagePath = `public/images/${imageToDelete.imageProduct}`;

    fs.unlink(imagePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Error deleting image file" });
      }

      // ลบข้อมูลจากฐานข้อมูล
      await Profile.destroy({ where: { id: id } });

      res.json({ message: "Image and data deleted successfully" });
    });
  } catch (error) {
    next(error);
  }
});

app.patch("/editImages/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Profile.update(
      {
        imageName: req.body.imageName,
        imagePrice: req.body.imagePrice,
        imageDetail: req.body.imageDetail,
        imageCategory: req.body.imageCategory,
      },
      { where: { id: id } }
    );
    res.json({ message: "Update succeeded" });
  } catch (error) {
    next(error);
  }
});

//End Upload Image
app.use(notFoundMiddleware);
app.use(errorMiddleware);

const port = process.env.PORT;
var options = {
  key: fs.readFileSync("src/ssl/private.key"),
  cert: fs.readFileSync("src/ssl/certificate.crt"),
  ca: fs.readFileSync("src/ssl/ca-cert.crt"),
};
// https
//   .createServer(options, function (req, res) {
//     res.writeHead(200);
//     res.end("Hello World Mew no");
//   })
//   .listen(port);

app.listen(port || 8000, () => {
  console.log("server running on port " + port);
});
