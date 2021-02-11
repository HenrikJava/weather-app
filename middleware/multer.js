const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");

//Multer used for save photo on disk.
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./tempProfilePhotoFolder");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});
//Extra validation because express validator cant handle file validation
const fileFilter = (req, file, cb) => {
  const validFiles = ["image/jpeg", "image/jpg", "image/png"];

  if (validFiles.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
module.exports = multer({ storage, fileFilter });
