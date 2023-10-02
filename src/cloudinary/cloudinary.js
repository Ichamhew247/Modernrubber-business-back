require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dxj8d8zrd",
  api_key: "123659393751486",
  api_secret: "2-6vVm9gR3VxXWZx6-DXRiLWQ-E",
  // secure: true,
});

module.exports = cloudinary;
