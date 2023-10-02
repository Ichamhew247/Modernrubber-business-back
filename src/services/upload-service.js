const cloudinary = require("../config/cloundinary");

exports.upload = (path) => cloudinary.uploader.upload(path);
