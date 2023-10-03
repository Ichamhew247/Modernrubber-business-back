// const cloudinary = require("../cloudinary/cloudinary");
// exports.uploadProductImage = async (req, res, next) => {
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
// };
