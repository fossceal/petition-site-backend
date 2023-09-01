const multer = require('multer');
const path = require('path');

const upload = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(".", "public", ));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const uploadfile = multer({ storage: upload })

module.exports = uploadfile;