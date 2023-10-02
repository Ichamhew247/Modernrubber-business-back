const multer = require("multer");

//memStorage กิน source มาก
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log(file);
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().getTime() +
        "" +
        Math.round(Math.random() * 100000) +
        "." +
        file.mimetype.split("/")[1]
    );
  },
});

module.exports = multer({ storage });
