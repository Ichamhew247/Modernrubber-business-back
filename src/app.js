require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cloudinary = require("./cloudinary/cloudinary");

const authRoute = require("./routes/auth-route");
const todoRoute = require("./routes/todo-route");
const productRoute = require("./routes/product-route");

const notFoundMiddleware = require("./middlewares/not-found");
const errorMiddleware = require("./middlewares/error");

const app = express();

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
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use("/auth", authRoute);
app.use("/todos", todoRoute);
app.use("/products", productRoute);
app.use("/upload", productRoute);

// app.post("/upload", async (req, res) => {
//   try {
//     const { image } = req.body;

//     const uploadedImage = await cloudinary.uploader.upload(image, {
//       upload_preset: "unsigned_upload",
//       public_id: "imageProduct",
//       allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
//     });

//     res.status(200).json(uploadedImage);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "An error occurred" });
//   }
// });

app.use(notFoundMiddleware);
app.use(errorMiddleware);
const port = process.env.PORT || 8000;
app.listen(port || 8000, () => {
  console.log("server running on port " + port);
});
