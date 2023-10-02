exports.imageProduct = async (req, res, next) => {
  const { image } = req.body;
  const uploadedImage = await cloudinary.v2.uploader.upload(
    image, // ต้องแน่ใจว่าคุณมีตัวแปร image ที่ถูกกำหนดให้ถูกต้อง
    {
      upload_preset: "unsigned_upload",
      public_id: "imageProduct ", // ต้องแน่ใจว่าคุณมีตัวแปร imageProduct ที่ถูกกำหนดให้ถูกต้อง
      allowed_formats: ["png", "jpg", "jpeg", "svg", "ico", "jfif", "webp"],
    },
    function (error, result) {
      if (error) {
        console.log(error);
        res.status(400).json({ error: "An error occurred" });
      } else {
        console.log(result);
        try {
          res.status(200).json(uploadedImage);
        } catch (err) {
          console.log(err);
        }
      }
    }
  );
};
